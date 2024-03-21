import { useAuthStore } from '@/store/auth/authStore'

let HomeRoutes = [{
    path: '',
    name: 'home_main',
    component: () => import('../../../pages/home/src/views/Main.vue')
  }, {
    path: 'login',
    name: 'home_login',
    component: () => import('../../../pages/home/src/views/Login.vue'),
    beforeEnter: (to, from, next) => {
      let authStore = useAuthStore()
      if (authStore.isLogged) {
        next('/dashboard')
      } else {
        next()
      }
    }
  }, {
    path: 'sign_in',
    name: 'home_sign_in',
    component: () => import('../../../pages/home/src/views/SignIn.vue')
  }, {
    path: 'choffer_login',
    name: 'choffer_login',
    component: () => import('../../../pages/home/src/views/ChofferLogin.vue')
  }, {
    path: 'legals',
    name: 'vtc_legals',
    component: () => import('../../../pages/home/src/views/Legals.vue')
  }
]
export default HomeRoutes