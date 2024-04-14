import api from "./api";


export function setAdress(place) {
  let formated_address = [place.address_components[0].long_name, place.address_components[1].long_name].join(' ')
  return {
    city: place.address_components[2].long_name,
    zip_code: place.address_components[6].long_name,
    country: place.address_components[5].short_name,
    longitude: place.geometry.location.lng(),
    latitude: place.geometry.location.lat(),
    address: formated_address
  }
}

export function setMapDefault () {
  return {
    coord: {
      lat: 45.7766,
      lng: 3.0821
    },
    center: {
      lat: 45.783329,
      lng: 3.08333
    },
    zoom: 12
  }
}

export function handleMap(place, index) {
  if (place.geometry) {
    let map_details = place.address_components
    let country_is_valid = map_details.find(component => component.short_name === 'FR')
    let zip_code_is_valid = map_details.find(component => component.short_name.startsWith('63'))
    if (country_is_valid && zip_code_is_valid) {
      return {
        departure: index === 1 ? place.formatted_address : '',
        destination: index === 0 ? place.formatted_address : '',
        departure_position: index === 1 ? setDetails(place).position : {},
        destination_position: index === 0 ? setDetails(place).position : {},
      }
    } else {
      return {
        error: 'Invalid city.',
      }
    }
  } {
    return {
      error: 'Données invalide.'
    }
  }
}

export function setDetails (place) {
  return {
    position: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    },
    center: {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng()
    }
  }
}


export async function create (data) {
  return await api.post('/adress', data)
}
export async function remove (address_id) {
  return await api.delete(`/adress/${address_id}`)
}

export async function edit (address_id, data) {
  return await api.patch(`/adress/${address_id}`, data)
}

export async function get (address_id) {
  return (await api.get(`/adress/${address_id}`)).data
}