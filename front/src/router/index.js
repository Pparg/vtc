import { createRouter, createWebHistory } from 'vue-router'

import HomeRoutes from './home/homeRouter'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...HomeRoutes,
  ]
})

export default router
