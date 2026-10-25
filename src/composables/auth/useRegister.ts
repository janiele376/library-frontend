import { ref } from 'vue';
import { useQuasar, date as quasarDate } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import { register } from '@/services/authService';
import { formatDateToISO } from '@/utils/dateUtils';
import { isValidCPF } from '@/utils/cpfValidator';

import {
  isValidFullName,
  isValidEmail,
  isValidPhone,
  isValidAddress,
} from '@/utils/userValidators';

export function useRegister() {
  const $q = useQuasar();
  const router = useRouter();
  const { t } = useI18n({ useScope: 'global' });

  const nameCompleted = ref('');
  const dateBirth = ref('');
  const email = ref('');
  const cpf = ref('');
  const phone = ref('');
  const address = ref('');
  const password = ref('');
  const confirmPassword = ref('');

  const showPassword = ref(false);
  const showConfirmPassword = ref(false);
  const loading = ref(false);
  const submitted = ref(false);

  const selectedDate = ref('');

  function allowedDates(value: string): boolean {
    const today = quasarDate.formatDate(Date.now(), 'YYYY/MM/DD');
    return value <= today;
  }

  function openDate(): void {
    selectedDate.value = dateBirth.value;
  }

  function confirmDate(): boolean {
    if (!selectedDate.value) return false;

    dateBirth.value = selectedDate.value;
    return true;
  }

  function cancelDate(): void {
    selectedDate.value = dateBirth.value;
  }

  function notifyError(message: string): void {
    $q.notify({
      type: 'negative',
      message,
    });
  }

  async function btnRegister(): Promise<void> {
    if (loading.value) return;

    submitted.value = true;

    const name = nameCompleted.value.trim();
    const userEmail = email.value.trim().toLowerCase();
    const userPhone = phone.value.trim();
    const userCpf = cpf.value.trim();
    const userAddress = address.value.trim();
    const formattedDate = formatDateToISO(dateBirth.value);

    if (
      !isValidFullName(name) ||
      !formattedDate ||
      !isValidEmail(userEmail) ||
      !isValidCPF(userCpf) ||
      !isValidPhone(userPhone) ||
      !isValidAddress(userAddress) ||
      !password.value ||
      !confirmPassword.value ||
      password.value !== confirmPassword.value
    ) {
      return;
    }

    loading.value = true;

    try {
      await register({
        nameCompleted: name,
        dateBirth: formattedDate,
        email: userEmail,
        cpf: userCpf,
        phone: userPhone,
        address: userAddress,
        password: password.value,
      });

      $q.notify({
        type: 'positive',
        message: t('auth.register.messages.success'),
      });

      await router.replace('/');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        let message = t('auth.register.messages.registrationError');

        if (status === 409) {
          message = t('auth.register.messages.userAlreadyExists');
        } else if (status === 400) {
          message = t('auth.register.messages.invalidData');
        } else if (!error.response) {
          message = t('auth.register.messages.connectionError');
        }

        notifyError(message);
      } else {
        console.error('Erro inesperado no cadastro:', error);

        notifyError(t('auth.register.messages.unexpectedError'));
      }
    } finally {
      loading.value = false;
    }
  }

  function btnCancel(): void {
    if (loading.value) return;

    nameCompleted.value = '';
    dateBirth.value = '';
    email.value = '';
    cpf.value = '';
    phone.value = '';
    address.value = '';
    password.value = '';
    confirmPassword.value = '';
    selectedDate.value = '';

    showPassword.value = false;
    showConfirmPassword.value = false;
    submitted.value = false;
  }

  return {
    nameCompleted,
    dateBirth,
    email,
    cpf,
    phone,
    address,
    password,
    confirmPassword,

    showPassword,
    showConfirmPassword,
    loading,
    submitted,
    selectedDate,

    isValidFullName,
    isValidEmail,
    isValidCPF,
    isValidPhone,
    isValidAddress,
    formatDateToISO,

    allowedDates,
    openDate,
    confirmDate,
    cancelDate,
    btnRegister,
    btnCancel,
  };
}
