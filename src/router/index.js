import { createRouter, createWebHistory } from 'vue-router'
import Grunddaten from '../views/Grunddaten.vue'
import Energie from '../views/Energie.vue'

const routes = [
  {
    path: '/',
    name: 'Grunddaten',
    component: Grunddaten
  },
  {
    path: '/energie',
    name: 'Energie',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Energie.vue')
    component: Energie
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
