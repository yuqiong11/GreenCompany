import { createRouter, createWebHistory } from 'vue-router'
import Grunddaten from '../views/Grunddaten.vue'
import Energie from '../views/Energie.vue'

const routes = [
  {
    path: '/',
    name: 'Grunddaten',
    component: Grunddaten,
    
  },
  {
    path: '/energie',
    name: 'Energie',
    component: Energie,
    // props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
