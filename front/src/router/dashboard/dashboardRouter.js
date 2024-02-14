
let DashboardRouter = [
  {
    path: '/',
    name: 'dashboard_home',
  }, {
    path: '/account',
    name: 'account',
    component: () => import ('../../../pages/dashboard/src/views/AccountView.vue')
  }
]


export default DashboardRouter