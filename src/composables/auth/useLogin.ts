import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';
import { isValidEmail } from '@/utils/userValidators';

export function useLogin() {
  const router = useRouter();
  const $q = useQuasar();
  const { t } = useI18n({ useScope: 'global' });
  const authStore = useAuthStore();

  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const loading = ref(false);
  const submitted = ref(false);

  function togglePassword(): void {
    showPassword.value = !showPassword.value;
  }

  async function btnLogin(): Promise<void> {
    if (loading.value) return;

    submitted.value = true;

    if (!isValidEmail(email.value) || !password.value.trim()) {
      return;
    }

    loading.value = true;

    try {
      await authStore.login({
        email: email.value.trim().toLowerCase(),
        password: password.value,
      });

      $q.notify({
        type: 'positive',
        message: t('auth.login.messages.success'),
      });

      await router.replace('/dashboard');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400 || status === 401) {
          $q.notify({
            type: 'negative',
            message: t('auth.login.messages.invalidCredentials'),
          });
        } else if (!error.response) {
          $q.notify({
            type: 'negative',
            message: t('auth.login.messages.connectionError'),
          });
        } else {
          $q.notify({
            type: 'negative',
            message: t('auth.login.messages.loginError'),
          });
        }
      } else {
        console.error('Erro inesperado no login:', error);

        $q.notify({
          type: 'negative',
          message: t('auth.login.messages.unexpectedError'),
        });
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    email,
    password,
    showPassword,
    loading,
    submitted,
    isValidEmail,
    togglePassword,
    btnLogin,
  };
}
