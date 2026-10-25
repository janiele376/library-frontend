import { defineBoot } from '#q-app';
import axios from 'axios';

const baseURL = import.meta.env.QCLI_API_URL;

if (!baseURL) {
  throw new Error('QCLI_API_URL não foi definida no arquivo .env');
}

function isTokenExpired(token: string): boolean {
  try {
    const payloadPart = token.split('.')[1];

    if (!payloadPart) {
      return true;
    }

    const base64 = payloadPart.replace(/-/g, '+').replace(/_/g, '/');

    const payload = JSON.parse(atob(base64)) as {
      exp?: number;
    };

    return typeof payload.exp !== 'number' || payload.exp * 1000 <= Date.now();
  } catch {
    return true;
  }
}

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');

  if (!token) {
    return config;
  }

  if (isTokenExpired(token)) {
    sessionStorage.removeItem('token');
    return config;
  }

  config.headers.set('Authorization', `Bearer ${token}`);

  return config;
});

export default defineBoot(({ app, router }) => {
  api.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (
        axios.isAxiosError(error) &&
        error.response?.status === 401 &&
        sessionStorage.getItem('token')
      ) {
        sessionStorage.removeItem('token');

        if (router.currentRoute.value.path !== '/') {
          void router.replace('/');
        }
      }

      return Promise.reject(error);
    },
  );

  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
});

export { api };
