import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore } from '@/store/auth/authStore'

import HomeRoutes from './home/homeRouter'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/:catchAll(.*)*',
    name: 'not_found',
    redirect: () => {
      let user = useAuthStore()
      if (user.isLogged) {
        return {name: 'home_page'}
      } else {
        return {name: 'home'}
      }
    }
  }, {
    path: '/',
    name: 'home',
    component: () => import('../../pages/home/App.vue'),
    children: HomeRoutes
  }, {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../../pages/dashboard/Dashboard.vue'),
    meta: {
      require_auth: true
    },
    redirect: {
      name: 'home_page'
    },
    children: [{
      path: 'home',
      name: 'home_page',
      component: () => import ('../../pages/dashboard/src/views/HomeView.vue')
    }, {
      path: 'account',
      name: 'account',
      component: () => import ('../../pages/dashboard/src/views/AccountView.vue')
    }, {
      path: 'reservation',
      name: 'reservation_layout',
      meta: {
        user_only: true
      },
      component: () => import('../../pages/dashboard/src/views/ReservationView.vue'),
      children: [{
        path: '',
        name: 'user_reservation',
        component: () => import('../../pages/dashboard/src/views/reservation/ReservationListView.vue')
      }, {
        path: 'add',
        name: 'new_reservation',
        component: () => import('../../pages/dashboard/src/views/reservation/AddReservationView.vue')
      }, {
        path: 'remove/:reservation_id',
        name: 'remove_reservation',
        component: () => import('../../pages/dashboard/src/views/reservation/DeleteReservationView.vue'),
        props: (route) => {
          return {
            reservation_id: parseInt(route.params.reservation_id)
          }
        }
      }, {
        path: 'edit/:reservation_id',
        name: 'edit_reservation',
        component: () => import('../../pages/dashboard/src/views/reservation/EditReservationView.vue'),
        props: (route) => {
          return {
            reservation_id: parseInt(route.params.reservation_id)
          }
        }
      }]
    }, {
      path: 'chofer/reservation',
      name: 'chofer_reservation',
      meta: {
        chofer_only: true
      },
      component: () => import('../../pages/dashboard/src/views/choffer/reservation/ChoferReservationView.vue'),
      children: [{
        path: '',
        name: 'chofer_reservations',
        component: () => import('../../pages/dashboard/src/views/choffer/reservation/ChoferReservationListView.vue')
      }]
    }, {
      path: 'adresse',
      name: 'address_layout', 
      meta: {
        user_only: true
      },
      component: () => import ('../../pages/dashboard/src/views/AddressView.vue'),
      children: [{
        path: '',
        name: 'user_address',
        component: () => import ('../../pages/dashboard/src/views/address/AddressListView.vue')
      }, {
        path: 'add',
        name: 'new_address',
        component: () => import ('../../pages/dashboard/src/views/address/AddAddressView.vue')
      }, {
        path: 'remove/:address_id',
        name: 'remove_address',
        props: (route) => {
          return {
            address_id: parseInt(route.params.address_id)
          }
        },
        component: () => import ('../../pages/dashboard/src/views/address/DeleteAddressView.vue')

      }, {
        path: ':address_id',
        name: 'edit_address',
        props: (route) => {
          return {
            address_id: parseInt(route.params.address_id)
          }
        },
        component: () => import ('../../pages/dashboard/src/views/address/EditAddressView.vue')
      }]
    }, {
      path: 'roles',
      name: 'roles',
      meta: {
        admin_only: true,
      },
      component: () => import ('../../pages/dashboard/src/views/RolesView.vue'),
  }, {
      path: 'users',
      name: 'user_layout',
      meta: {
        admin_only: true
      },
      component: () => import ('../../pages/dashboard/src/views/account_list/AccountsView.vue'),
      children: [{
        path: '',
        name: 'list_of_users',
        component: () => import ('../../pages/dashboard/src/views/account_list/AccountListView.vue')
      },{
        path: ':user_id',
        name: 'user_details',
        component: () => import ('../../pages/dashboard/src/views/account_list/UserDetailsView.vue'),
        props: (route) => {
          return {
            user_id: route.params.user_id
          }
        }
      }, {
        path: 'new_choffer',
        name: 'users_new_choffer',
        component: () => import ('../../pages/dashboard/src/views/choffer/AddChofferView.vue')
      }]
    }, {
      path: 'availability',
      name: 'chofer_availabilities',
      meta: {
        chofer_only: true,
      },
      component: () => import ('../../pages/dashboard/src/views/availability/AvailabilityView.vue'),
      children: [{
        path: '',
        name: 'availability_overwiew',
        component: () => import ('../../pages/dashboard/src/views/availability/AvailabilityOverView.vue')
      }, {
        path: 'add',
        name: 'add_availability',
        component: () => import ('../../pages/dashboard/src/views/availability/AddAvailabilityView.vue')
      }, {
        path: 'edit/:availability_id',
        name: 'edit_availability',
        props: (route) => {
          return {
            availability_id: parseInt(route.params.availability_id)
          }
        }, 
        component: () => import ('../../pages/dashboard/src/views/availability/EditAvailabilityView.vue')
      }, {
        path: 'remove/:availability_id',
        name: 'remove_availability',
        props: (route) => {
          return {
            availability_id: parseInt(route.params.availability_id)
          }
        },
        component: () => import ('../../pages/dashboard/src/views/availability/DeleteAvailabilityView.vue')
      }]
    }, {
      path: 'cars',
      name: 'cars',
      meta: {
        admin_only: true
      },
      component: () => import ('../../pages/dashboard/src/views/CarsView.vue'),
      children: [{
        path: '',
        name: 'list_of_cars',
        component: () => import ('../../pages/dashboard/src/views/vehicule/CarsListView.vue')
      },{
        path: 'add',
        name: 'new_vehicule',
        component: () => import ('../../pages/dashboard/src/views/vehicule/AddCarView.vue')
      }, {
        path: ':id',
        name: 'edit_car',
        component: () => import ('../../pages/dashboard/src/views/vehicule/EditCarView.vue'),
        props: (route) => {
          return {
            id: parseInt(route.params.id)
          }
        }
      }, {
        path: 'remove/:id',
        name: 'delete_car',
        props: (route) => {
          return {
            id: parseInt(route.params.id)
          }
        },
        component: () => import ('../../pages/dashboard/src/views/vehicule/DeleteCarView.vue')
      }],
    }, {
      path: 'notifications',
      name: 'notifications',
      meta: {
        admin_only: true
      },
      component: () => import ('../../pages/dashboard/src/views/NotificationView.vue'),
      children: [{
        path: '',
        name: 'notification_list',
        component: () => import ('../../pages/dashboard/src/views/notification/NotificationListView.vue')
      }, {
        path: 'add',
        name: 'new_notification',
        component: () => import ('../../pages/dashboard/src/views/notification/AddNotificationView.vue')
      }, {
        path: ':id',
        name: 'edit_notification',
        props: (route) => {
          return {
            id: parseInt(route.params.id)
          }
        },
        component: () => import ('../../pages/dashboard/src/views/notification/EditNotificationView.vue')
      }, {
        path: 'remove/:id',
        name: 'delete_notification',
        props: (route) => {
          return {
            id: parseInt(route.params.id)
          }
        },
        component: () => import ('../../pages/dashboard/src/views/notification/DeleteNotificationView.vue')
      }]
    }]
  }]
})

router.beforeEach((to, from, next) => {
  if (to.meta.require_auth) {
    let user = useAuthStore()
    let role = user.getUser.role
    if (user.isLogged) {
      if (to.meta.admin_only) {
        if (user.isAdmin) {
          next()
        } else {
          next('/')
        }
      } else if (to.meta.user_only) {
        if (role === 'user' || user.isAdmin) {
          next()
        } else {
          next('/')
        }
      } else if (to.meta.chofer_only) {
        if (role === 'chofer') {
          next()
        } else {
          next('/')
        }
      } else {
        next()
      } 

    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
