import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/demo_reactivite',
      component: () => import('../demos/Reactivite.vue'),
    },
    {
      path: '/planets',
      component: () => import('../views/PlanetList.vue'),
    },
  ],
})

export default router
