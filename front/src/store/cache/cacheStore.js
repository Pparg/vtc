import { defineStore } from "pinia";

export let useCacheStore = defineStore('cache', {
  state: () => ({
    cache: {

    }
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
      this.state.cache = {
        ...this.state.cache,
        [key]: null
      }
    },
    add(key, data) {
      this.state.cache[key] = data
    }
  }
})


