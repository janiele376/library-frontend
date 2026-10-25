import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';
import { getMyProfile, updateMyProfile } from '@/services/userService';

import {
  isValidFullName,
  isValidEmail,
  isValidPhone,
  isValidAddress,
} from '@/utils/userValidators.js';

import { formatDateToBR } from '@/utils/dateUtils';

import type { UserResponse, UpdateUserRequest } from '@/types/user';

type ProfileField = 'email' | 'phone' | 'birthDate' | 'cpf' | 'address';
type PasswordField = 'currentPassword' | 'newPassword' | 'confirmPassword';

export function useEditProfile() {
  const router = useRouter();
  const $q = useQuasar();
  const { t } = useI18n({ useScope: 'global' });
  const authStore = useAuthStore();

  const loading = ref(false);
  const saving = ref(false);
  const loaded = ref(false);
  const originalUser = ref<UserResponse | null>(null);

  const form = reactive({
    nameCompleted: '',
    email: '',
    phone: '',
    birthDate: '',
    cpf: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const profileFields: {
    key: ProfileField;
    label: string;
    icon: string;
    readonly?: boolean;
  }[] = [
    {
      key: 'email',
      label: 'settings.email',
      icon: 'mail_outline',
    },
    {
      key: 'phone',
      label: 'settings.phone',
      icon: 'phone',
    },
    {
      key: 'birthDate',
      label: 'settings.birthDate',
      icon: 'calendar_month',
      readonly: true,
    },
    {
      key: 'cpf',
      label: 'settings.cpf',
      icon: 'badge',
      readonly: true,
    },
    {
      key: 'address',
      label: 'settings.address',
      icon: 'location_on',
    },
  ];

  const passwordFields: {
    key: PasswordField;
    label: string;
  }[] = [
    {
      key: 'currentPassword',
      label: 'settings.edit.currentPassword',
    },
    {
      key: 'newPassword',
      label: 'settings.edit.newPassword',
    },
    {
      key: 'confirmPassword',
      label: 'settings.edit.confirmPassword',
    },
  ];

  const visiblePasswords = reactive<Record<PasswordField, boolean>>({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  function notifyError(message: string): void {
    $q.notify({
      type: 'negative',
      message,
    });
  }

  async function loadProfile(): Promise<void> {
    if (!authStore.isAuthenticated || authStore.isAdmin) {
      await router.replace('/dashboard');
      return;
    }

    loading.value = true;
    loaded.value = false;

    try {
      const user = await getMyProfile();

      originalUser.value = user;

      form.nameCompleted = user.nameCompleted;
      form.email = user.email;
      form.phone = user.phone;
      form.birthDate = formatDateToBR(user.dateBirth);
      form.cpf = user.cpf;
      form.address = user.address;

      form.currentPassword = '';
      form.newPassword = '';
      form.confirmPassword = '';

      loaded.value = true;
    } catch (error: unknown) {
      console.error('Erro ao carregar perfil:', error);
      notifyError(t('settings.edit.loadError'));
    } finally {
      loading.value = false;
    }
  }

  async function save(): Promise<void> {
    if (saving.value || !originalUser.value) return;

    if (!form.currentPassword) {
      notifyError(t('settings.edit.currentPasswordRequired'));
      return;
    }

    if (form.currentPassword.length < 8) {
      notifyError(t('settings.edit.currentPasswordMinLength'));
      return;
    }

    if (form.newPassword || form.confirmPassword) {
      if (form.newPassword.length < 8 || form.newPassword !== form.confirmPassword) {
        notifyError(t('settings.edit.passwordMismatch'));
        return;
      }
    }

    const nameCompleted = form.nameCompleted.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const address = form.address.trim();

    if (!isValidFullName(nameCompleted)) {
      notifyError(t('settings.edit.invalidFullName'));
      return;
    }

    if (!isValidEmail(email)) {
      notifyError(t('settings.edit.invalidEmail'));
      return;
    }

    if (!isValidPhone(phone)) {
      notifyError(t('settings.edit.invalidPhone'));
      return;
    }

    if (!isValidAddress(address)) {
      notifyError(t('settings.edit.invalidAddress'));
      return;
    }

    const data: UpdateUserRequest = {
      nameCompleted: nameCompleted !== originalUser.value.nameCompleted ? nameCompleted : null,
      email: email !== originalUser.value.email ? email : null,
      phone: phone !== originalUser.value.phone ? phone : null,
      address: address !== originalUser.value.address ? address : null,
      password: form.newPassword || null,
      currentPassword: form.currentPassword,
    };

    const emailChanged = data.email !== null;
    const passwordChanged = data.password !== null;

    saving.value = true;

    try {
      await updateMyProfile(data);

      $q.notify({
        type: 'positive',
        message: t('settings.edit.updateSuccess'),
      });

      if (emailChanged || passwordChanged) {
        authStore.logout();
        await router.replace('/');
        return;
      }

      await router.replace('/settings');
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400) {
          notifyError(t('settings.edit.invalidCurrentPassword'));
        } else if (status === 409) {
          notifyError(t('settings.edit.emailAlreadyInUse'));
        } else if (status === 403) {
          notifyError(t('settings.edit.permissionDenied'));
        } else if (!error.response) {
          notifyError(t('auth.login.messages.connectionError'));
        } else {
          notifyError(t('auth.login.messages.unexpectedError'));
        }
      } else {
        notifyError(t('auth.login.messages.unexpectedError'));
      }
    } finally {
      saving.value = false;
    }
  }

  return {
    loading,
    saving,
    loaded,
    form,
    profileFields,
    passwordFields,
    visiblePasswords,
    loadProfile,
    save,
  };
}
