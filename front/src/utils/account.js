import api from "./api";

// Data


// API

export async function updateUser (data) {
  return await api.post('/users/update', data)
}