import { defineRouter } from '#q-app';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { isTokenExpired } from '@/utils/tokenUtils';

export default defineRouter(() => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  });

  Router.beforeEach((to) => {
    if (!to.matched.some((route) => route.meta.requiresAuth)) {
      return true;
    }

    const token = sessionStorage.getItem('token');

    if (!token || isTokenExpired(token)) {
      sessionStorage.removeItem('token');

      return {
        path: '/',
        replace: true,
      };
    }

    return true;
  });

  return Router;
});
