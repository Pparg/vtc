import api from './api/index'

import { useCacheStore } from '@/store/cache/cacheStore'

let cache_store = useCacheStore()

// API 

export async function getAll() {
  let cache_key = 'api/cars'
  if (cache_store.getKey(cache_key)) {
    return cache_store.getKey(cache_key)
  } else {
    let request = (await api.get('/cars')).data.data
    cache_store.add(cache_key, request)
    return request
  }
}

export async function get(id) {
  return (await api.get(`/cars/${id}`))
}

export async function create(data) {
  return await api.post('/cars', data)
}

export async function update(car_id, data) {
  return await api.patch(`/cars/${car_id}`, data)
}

export async function remove(car_id) {
  return await api.delete(`/cars/${car_id}`)
}

// Cache

export function removeCache() {
  cache_store.remove('api/cars')
}