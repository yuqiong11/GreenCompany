import { createRouter, createWebHistory } from 'vue-router'
import Basicdata from '../views/Basicdata.vue'
import Energy from '../views/Energy.vue'
import Mobility from '../views/Mobility.vue'

const routes = [
  {
    path: '/',
    name: 'Basicdata',
    component: Basicdata,
    
  },
  {
    path: '/energy',
    name: 'Energy',
    component: Energy,
  },
  {
    path: '/mobility',
    name: 'Mobility',
    component: Mobility,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
