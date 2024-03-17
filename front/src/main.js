
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import VueGoogleMaps from '@fawmi/vue-google-maps'

import { useApplicationStore } from '@/store/application/applicationStore';
import { useCacheStore } from '@/store/cache/cacheStore';
import { useAuthStore } from '@/store/auth/authStore';

import api from './utils/api';

import './assets/fonts/fonts.scss'
import './assets/styles/global.scss'

import App from './App.vue'
import Dashboard from '../pages/dashboard/Dashboard.vue'
import router from './router'


import Button from './components/Button.vue';
import Link from './components/Link.vue';
import InputNumber from './components/InputNumber.vue';
import InputText from './components/InputText.vue';
import LoadableList from './components/LoadableList.vue';
import Icon from './components/Icon.vue';


const pinia = createPinia();
const app = createApp(App)
const dashboard = createApp(Dashboard)

app.use(pinia)

app.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDZOFx7cPrYyOm5oNTPZwrbBeLOttYcWfo',
    libraries: 'places'
  }
})

app.component('Button', Button)
app.component('Link', Link)
app.component('InputNumber', InputNumber)
app.component('InputText', InputText)
app.component('Icon', Icon)

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
