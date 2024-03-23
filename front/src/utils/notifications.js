import api from "./api/index";


export let getNotificationStyle = {
  info: {
    icon: 'info-circle',
    color: '',
    bg_color: '#eab676'
  },
  new: {
    icon: 'star',
    color: '',
    bg_color: '#459ECC',
  },
  bug_fix: {
    icon: 'wrench',
    color: '',
    bg_color: '#4CAF50'
  }
}

export let dropdown_options = [{
  label: 'Nouveauté',
  value: 'new'
}, {
  label: 'Informations',
  value: 'info'
}, {
  label: 'Correction de bug',
  value: 'bug_fix'
}];


export async function create(data) {
  return await api.post('/notifications', data)
}

export async function remove(id) {
  return await api.delete(`/notifications/${id}`)
}

export async function get(id) {
  return (await api.get(`/notifications/${id}`)).data
}

export async function edit(id, data) {
  return await api.patch(`/notifications/${id}`, data)
}

export async function user_get() {
  return (await api.get(`/notifications`)).data
}