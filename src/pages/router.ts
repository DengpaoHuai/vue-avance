import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './index.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/auth',
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('./auth/login.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('./auth/register.vue'),
        },
      ],
    },
    {
      path: '/products',
      children: [
        {
          path: '',
          name: 'products-list',
          component: () => import('./products/index.vue'),
        },
      ],
    },
  ],
});

export default router;
