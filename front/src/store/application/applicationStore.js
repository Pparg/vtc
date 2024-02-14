import { defineStore } from "pinia";

export let useApplicationStore = defineStore('application', {
  state: () => ({
    application: {}
  }),
  getters: {
    getApplication: (state) => {
      return state.application
    },
    getInfo: (state) => {
      return (key) => state.application[key]
    },
  },
  actions: {
    setData(data){
      this.application_data = data
    }
  }
})