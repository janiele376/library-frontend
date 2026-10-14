import { defineBoot } from '#q-app';
import axios from 'axios';

const baseURL = import.meta.env.QCLI_API_URL;

if (!baseURL) {
  throw new Error('QCLI_API_URL não foi definida no arquivo .env');
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

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`);
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error),
);

export default defineBoot(({ app, router }) => {
  api.interceptors.response.use(
    (response) => response,
    (error) => {
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
