import { defineStore } from "pinia";

export let useCacheStore = defineStore('cache', {
  state: () => ({
    cache: {}
  }),
  getters: {
    get: (state) => {
      return state.cache
    },
    getKey: (state) => {
      return (key) => state.cache[key]
    }
  },
  actions: {
    remove(key) {
      this.cache = {
        ...this.cache,
        [key]: null
      }
    },
    add(key, data) {
      this.cache[key] = data
    }
  }
})


