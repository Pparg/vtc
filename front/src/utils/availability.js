import api from "./api/index";

export let creation_type_dropdown = [{
  label: 'Jour',
  value: 'single'
  }, {
  label: 'Semaine',
  value: 'week'
  }]

export let week_days_options = [
  { label: 'Dimanche', value: 0 },
  { label: 'Lundi', value: 1 },
  { label: 'Mardi', value: 2 },
  { label: 'Mercredi', value: 3 },
  { label: 'Jeudi', value: 4 },
  { label: 'Vendredi', value: 5 },
  { label: 'Samedi', value: 6 }
];

export function formatModel (model, type) {
  let data = {...model}
  if (type === 'single' && !data.multiple) {
    delete data.dates
  } else if (type === 'week') {
    data.except = data.except.filter((exception) => !exception.day_position)
    if (!data.multiple) {
      delete data.weeks
    }
  }
  return data
}

export function setEditModel( data ) {
  let model = {}
  data.forEach(item => {
    model[item.id] = {
      start: item.start_time,
      end: item.end_time
    }
  })
  return model
}

export function generateDropdownOption () {
  let monthNames = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
  let current_month = new Date().getMonth()
  let dropdown_options = [{
    label: '7 prochains jours',
    value: 'week'
  }, {
    label: '14 prochains jours',
    value: 'week2'
  }]
  for (let month = 0; month < 4; month++) {
    let next_month = (current_month + month) % 12
    dropdown_options.push({
      label: monthNames[next_month],
      value: `month_${next_month}`
    })
  }
  return dropdown_options
}

export function formatEdit(data) {
  return Object.keys(data).map((availability_id) => {
    return {
      start: data[availability_id].start,
      end: data[availability_id].end,
      id: availability_id
    }
  })
}

// API

export async function get(type = null) {
  if (!type) {
    return await api.get('/availability')
  } else {
    return await api.get(`/availability?type=${type}`)
  }
}

export async function create(type, data) {
  return await api.post(`/availability?type=${type}`, data)
}

export async function getAvailability(id) {
  return api.get(`/availability/${id}`)
}

export async function edit(data) {
  return await api.patch('/availability', data)
}

export async function remove(id) {
  return await api.delete(`/availability/${id}`)
}
