import api from "../api";


export async function login (data) {
  return await api.post('/auth/login', data)
}

export async function logOut () {
  return await api.get('/auth/logout')
}

export async function createAccount (data) {
  return await api.post('/users/register', data)
}

export async function choffeurLogin(data) {
  return await api.post('/auth/login?choffer=true', data)
}