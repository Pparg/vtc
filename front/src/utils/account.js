import api from "./api";

// Data

export let formatData = (role, model) => {
  if (role !== 'choffer') {
    delete model.description
  }
  if (model.birthday.length === 0 ) {
    model = {
      ...model,
      birthday: null,
    }
  }
  if (model.phone_number.length === 0) {
    model = {
      ...model,
      phone_number: null
    }
  }
  return model
}
// API

export async function update (data) {
  return await api.patch(`/users`, data)
}
export async function updatePassword(data) {
  return await api.patch(`/users/password`, data)
}

export async function remove(user_id) {
  return await api.delete(`/users`)
}

export async function createChofferAccount(data) {
  return await api.post('/choffers', data)
}