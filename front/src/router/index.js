import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/store/auth/authStore'

import HomeRoutes from './home/homeRouter'
import DashboardRouter from './dashboard/dashboardRouter'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    component: () => import('../../pages/home/App.vue'),
    children: HomeRoutes
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../../pages/dashboard/App.vue'),
    children: DashboardRouter,
    beforeEnter: (to, from, next) => {
      let authStore = useAuthStore()
      if (authStore.isLogged) {
        next()
      } else {
        next('/login')
      }
    }
  }, {
    path: '/admin_dashboard',
    name: 'admin_dashboard',
    component: () => import('../../pages/admin/App.vue'),
    beforeEnter: (to, from, next) => {
      let authStore = useAuthStore()
      if (authStore.isAdmin && authStore.isLogged) {
        next()
      } else if (authStore.isLogged) {
        next('/dashboard')
      } else {
        next('/login')
      }
    }
  }]
})

export default router
