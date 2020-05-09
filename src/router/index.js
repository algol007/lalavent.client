import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Event from '../views/EventList.vue'
import Dashboard from '../views/Dashboard.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import RegisterOrganizer from '../views/Register-Owner.vue'
import OrganizerEventList from '../views/OrganizerEventList.vue'
import AdminEventList from '../views/AdminEventList.vue'
import AdminOrganizerList from '../views/AdminOrganizerList.vue'
import EventStatistic from '../views/EventStatistic.vue'
import AddEvent from '../views/AddEvent.vue'
import Logout from '../views/Logout.vue'
import Payment from '../views/Payment.vue'
import Profil from '../views/Profil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/event',
    name: 'Event',
    component: Event
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/register-organizer',
    name: 'RegisterOrganizer',
    component: RegisterOrganizer
  },
  {
    path: '/:organizerId/event-list',
    name: 'OrganizerEventList',
    component: OrganizerEventList
  },
  {
    path: '/:organizerId/event-statistic',
    name: 'EventStatistic',
    component: EventStatistic
  },
  {
    path: '/:organizerId/add-event',
    name: 'AddEvent',
    component: AddEvent
  },
  {
    path: '/admin/admin-event-list',
    name: 'AdminEventList',
    component: AdminEventList
  },
  {
    path: '/admin/admin-organizer-list',
    name: 'AdminOrganizerList',
    component: AdminOrganizerList
  },
  {
    path: '/logout',
    name: 'Logout',
    component: Logout
  },
  {
    path: '/payment',
    name: 'Payment',
    component: Payment
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
