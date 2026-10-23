import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

import { login as loginRequest } from '@/services/authService';
import type { LoginRequest } from '@/types/auth';
import { decodeToken, isTokenExpired } from '@/utils/tokenUtils';

interface AuthUser {
  email: string;
  isAdmin: boolean;
}

function getStoredToken(): string | null {
  if (typeof sessionStorage === 'undefined') {
    return null;
  }

  const token = sessionStorage.getItem('token');

  if (!token || isTokenExpired(token)) {
    sessionStorage.removeItem('token');
    return null;
  }

  return token;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(getStoredToken());
  const user = ref<AuthUser | null>(null);

  const isAuthenticated = computed(() => {
    return token.value !== null && user.value !== null;
  });

  const isAdmin = computed(() => {
    return user.value?.isAdmin === true;
  });

  function restoreSession(): boolean {
    const storedToken = getStoredToken();

    if (!storedToken) {
      logout();
      return false;
    }

    const payload = decodeToken(storedToken);

    if (!payload) {
      logout();
      return false;
    }

    token.value = storedToken;
    user.value = {
      email: payload.sub,
      isAdmin: payload.isAdmin,
    };

    return true;
  }

  async function login(data: LoginRequest): Promise<void> {
    const response = await loginRequest(data);

    if (!response.token || isTokenExpired(response.token)) {
      throw new Error('Token inválido ou expirado.');
    }

    const payload = decodeToken(response.token);

    if (!payload) {
      throw new Error('Não foi possível validar o token recebido.');
    }

    sessionStorage.setItem('token', response.token);

    token.value = response.token;
    user.value = {
      email: payload.sub,
      isAdmin: payload.isAdmin,
    };
  }

  function logout(): void {
    sessionStorage.removeItem('token');

    token.value = null;
    user.value = null;
  }

  return {
    token,
    user,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    restoreSession,
  };
});
