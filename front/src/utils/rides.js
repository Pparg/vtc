import api from "./api";

export function adressAreValid(departure, destination) {
  return (departure.length > 0 && destination.length > 0)
}

export function reservationIsEditable(reservation) {
  let reservation_date = new Date(`${reservation.date}T${reservation.hour}`)
  return new Date() < reservation_date
}


export async function get (id) {
  return (await api.get(`/rides/${id}`)).data
}

export async function create(data) {
  return await api.post('/rides', data)
}

export async function edit(id, data) {
  return await api.patch(`/rides/${id}`, data)
}

export async function remove(id) {
  return await api.delete(`/rides/${id}`)
}

export async function getRidesSummary() {
  return (await api.get('/rides/resume')).data
}