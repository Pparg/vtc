import { defineStore } from "pinia";

import api from "@/utils/api";

export let useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAdmin: false,
    isLogged: false
  }),
  getters: {
    getUser: (state) => {
      return state.user
    },
    userIsAdmin: (state) => {
      return state.isAdmin
    },
    userIsLogged: (state) => {
      return state.isLogged
    }
  },
  actions: {
    setUser(user_data, role) {
      this.user = {
        ...user_data,
        role: role
      }
      this.isLogged = true
    },
    setAdmin(data) {
      this.isAdmin = data
    },
    logOut() {
      localStorage.removeItem('63vtc')
      this.user = null
      this.isAdmin = false,
      this.isLogged = false
    }
  }
})