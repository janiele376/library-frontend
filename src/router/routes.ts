import type { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        component: () => import('@/pages/auth/IndexPage.vue'),
      },
      {
        path: 'forgot-password',
        name: 'forgot-password',
        component: () => import('@/pages/auth/ForgotPassword.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/auth/RegisterPage.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
    },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('@/pages/DashboardPage.vue'),
      },
    ],
  },
  {
    path: '/users',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ROLE_ADMIN'],
    },
    children: [
      {
        path: '',
        name: 'users',
        component: () => import('@/pages/admin/UsersPage.vue'),
      },
    ],
  },
  {
    path: '/books',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ROLE_ADMIN'],
    },
    children: [
      {
        path: '',
        name: 'books',
        component: () => import('@/pages/admin/BooksPage.vue'),
      },
    ],
  },
  {
    path: '/publishers',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ROLE_ADMIN'],
    },
    children: [
      {
        path: '',
        name: 'publishers',
        component: () => import('@/pages/admin/PublishersPage.vue'),
      },
    ],
  },
  {
    path: '/rentals',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: true,
      roles: ['ROLE_ADMIN'],
    },
    children: [
      {
        path: '',
        name: 'rentals',
        component: () => import('@/pages/admin/RentalsPage.vue'),
      },
    ],
  },
  {
    path: '/settings',
    component: () => import('@/layouts/AuthLayout.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: '',
        name: 'settings',
        component: () => import('@/pages/settings/SettingsPage.vue'),
        meta: {
          roles: ['ROLE_ADMIN', 'ROLE_USER'],
        },
      },
      {
        path: 'edit',
        name: 'edit-profile',
        component: () => import('@/pages/settings/EditProfilePage.vue'),
        meta: {
          roles: ['ROLE_USER'],
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    name: 'not-found',
    component: () => import('@/pages/ErrorNotFound.vue'),
  },
];

export default routes;
