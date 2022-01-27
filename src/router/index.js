import { createRouter, createWebHistory } from 'vue-router'
import Basicdata from '../views/Basicdata.vue'
import Energy from '../views/Energy.vue'
import Mobility from '../views/Mobility.vue'
import Mobility2 from '../views/Mobility2.vue'
import Mobility3 from '../views/Mobility3.vue'
import Total from '../views/Total.vue'

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
  },
  {
    path: '/mobility2',
    name: 'Mobility2',
    component: Mobility2,
  },
  {
    path: '/mobility3',
    name: 'Mobility3',
    component: Mobility3,
  },
  {
    path: '/total',
    name: 'Total',
    component: Total,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
