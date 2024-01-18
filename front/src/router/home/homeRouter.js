import { createRouter } from "vue-router";

let HomeRoutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../../../pages/home/src/views/Main.vue')
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../../../pages/home/src/views/Login.vue')
  }, {
    path: '/sign_in',
    name: 'sign_in',
    component: () => import('../../../pages/home/src/views/SignIn.vue')
  }

]

export default HomeRoutes