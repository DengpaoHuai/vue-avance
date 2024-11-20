import { createRouter, createWebHistory } from 'vue-router';
import HomeView from './index.vue';
import useAuthStore from '@/stores/auth';
import { getProducts } from '@/features/products/api/useProducts';
import httpClient from '@/modules/http-client';

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
      path: '/users/create/:id/:step',
      name: 'create_user',
      component: () => import('./users/create/index.vue'),
    },
    {
      path: '/products',
      beforeEnter: async (to, from, next) => {},
      meta: { layout: 'LoggedLayout' },
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
