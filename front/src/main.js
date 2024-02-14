
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { useApplicationStore } from '@/store/application/applicationStore';
import { useCacheStore } from '@/store/cache/cacheStore';
import { useAuthStore } from '@/store/auth/authStore';

import api from './utils/api';

import './assets/fonts/fonts.scss'
import './assets/styles/global.scss'

import App from './App.vue'
import Dashboard from '../pages/dashboard/App.vue'
import router from './router'


const pinia = createPinia();
const app = createApp(App)
const dashboard = createApp(Dashboard)

app.use(pinia)

const authStore = useAuthStore()
const applicationStore = useApplicationStore()
const cacheStore = useCacheStore()

let maintain_session = async () => {
  let vtc_token = localStorage.getItem('63vtc')
  if (vtc_token) {
    try {
      let session = await api.get('/auth/session', {
        headers: {
          Authorization: `Bearer ${vtc_token}`
        }
      })
      if (session.status === 200) {
        authStore.setUser(session.data.user_data, session.data.role)
        authStore.setAdmin(session.data.isAdmin)
      }
    } catch (error) {
      console.error('Error restoring session', error)
      localStorage.removeItem('63vtc')
    }
  }
}

await maintain_session()

app.use(router)

app.mount('#app')
