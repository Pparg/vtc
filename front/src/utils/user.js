import api from "./api";

export async function get(user_id) {
  return (await api.get(`/users/${user_id}`))
}

export async function adminGet(user_id) {
  return (await api.get(`/users/admin/${user_id}`)).data
}