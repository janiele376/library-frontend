import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import { forgotPassword } from '@/services/authService';
import { isValidEmail } from '@/utils/userValidators';

export function useForgotPassword() {
  const $q = useQuasar();
  const router = useRouter();
  const { t } = useI18n({ useScope: 'global' });

  const email = ref('');
  const cpf = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const loading = ref(false);
  const submitted = ref(false);

  const showPassword = ref(false);
  const showConfirmPassword = ref(false);

  function isValidCpfLength(value: string): boolean {
    return value.replace(/\D/g, '').length === 11;
  }

  async function btnForgotPassword(): Promise<void> {
    if (loading.value) return;

    submitted.value = true;

    const formattedEmail = email.value.trim().toLowerCase();
    const cpfNumbers = cpf.value.replace(/\D/g, '');

    if (
      !isValidEmail(formattedEmail) ||
      !isValidCpfLength(cpf.value) ||
      !password.value ||
      !confirmPassword.value ||
      password.value !== confirmPassword.value
    ) {
      return;
    }

    const cpfFormatted =
      `${cpfNumbers.slice(0, 3)}.` +
      `${cpfNumbers.slice(3, 6)}.` +
      `${cpfNumbers.slice(6, 9)}-` +
      `${cpfNumbers.slice(9, 11)}`;

    loading.value = true;

    try {
      await forgotPassword({
        email: formattedEmail,
        cpf: cpfFormatted,
        newPassword: password.value,
        confirmPassword: confirmPassword.value,
      });

      $q.notify({
        type: 'positive',
        message: t('auth.forgotPassword.messages.success'),
      });

      password.value = '';
      confirmPassword.value = '';

      await router.replace('/');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        let message = t('auth.forgotPassword.messages.resetError');

        if (status === 400) {
          message = t('auth.forgotPassword.messages.invalidData');
        } else if (status === 401 || status === 403) {
          message = t('auth.forgotPassword.messages.validationError');
        } else if (status === 404) {
          message = t('auth.forgotPassword.messages.notFound');
        } else if (!error.response) {
          message = t('auth.forgotPassword.messages.connectionError');
        }

        $q.notify({
          type: 'negative',
          message,
        });
      } else {
        console.error('Erro inesperado:', error);

        $q.notify({
          type: 'negative',
          message: t('auth.forgotPassword.messages.unexpectedError'),
        });
      }
    } finally {
      loading.value = false;
    }
  }

  async function btnCancel(): Promise<void> {
    if (loading.value) return;

    email.value = '';
    cpf.value = '';
    password.value = '';
    confirmPassword.value = '';

    showPassword.value = false;
    showConfirmPassword.value = false;
    submitted.value = false;

    await router.push('/');
  }

  return {
    email,
    cpf,
    password,
    confirmPassword,

    loading,
    submitted,
    showPassword,
    showConfirmPassword,

    isValidEmail,
    isValidCpfLength,

    btnForgotPassword,
    btnCancel,
  };
}
