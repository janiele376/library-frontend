import { defineRouter } from '#q-app';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import { useAuthStore } from '@/stores/authStore';

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
    const authStore = useAuthStore();

    const authenticated = authStore.restoreSession();

    const requiresAuth = to.matched.some((route) => route.meta.requiresAuth === true);

    if (requiresAuth && !authenticated) {
      return {
        path: '/',
        replace: true,
      };
    }

    const isGuestRoute = ['/', '/register', '/forgot-password'].includes(to.path);

    if (authenticated && isGuestRoute) {
      return {
        path: '/dashboard',
        replace: true,
      };
    }

    const allowedRoles = to.matched.flatMap((route) => {
      const roles = route.meta.roles;

      return Array.isArray(roles) ? roles : [];
    });

    if (allowedRoles.length > 0) {
      const currentRole = authStore.isAdmin ? 'ROLE_ADMIN' : 'ROLE_USER';

      if (!allowedRoles.includes(currentRole)) {
        return {
          path: '/dashboard',
          replace: true,
        };
      }
    }

    return true;
  });

  return Router;
});
