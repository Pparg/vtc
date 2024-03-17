import api from '../api/index'


// API 

export async function getAll() {
  return ( await api.get('/roles')).data
}