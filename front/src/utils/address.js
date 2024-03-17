import api from "./api";

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