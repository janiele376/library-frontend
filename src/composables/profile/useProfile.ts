import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import axios from 'axios';

import { useAuthStore } from '@/stores/authStore';
import { getMyProfile } from '@/services/userService';
import { formatDateToBR } from '@/utils/dateUtils';

import type { UserResponse } from '@/types/user';

export function useProfile() {
  const $q = useQuasar();
  const { t } = useI18n({ useScope: 'global' });
  const authStore = useAuthStore();

  const user = ref<UserResponse | null>(null);
  const loading = ref(false);

  const profileFields = computed(() => {
    if (!user.value) return [];

    return [
      {
        key: 'email',
        label: 'settings.email',
        icon: 'mail_outline',
        value: user.value.email,
      },
      {
        key: 'phone',
        label: 'settings.phone',
        icon: 'phone',
        value: user.value.phone,
      },
      {
        key: 'birthDate',
        label: 'settings.birthDate',
        icon: 'calendar_month',
        value: formatDateToBR(user.value.dateBirth),
      },
      {
        key: 'cpf',
        label: 'settings.cpf',
        icon: 'badge',
        value: user.value.cpf,
      },
      {
        key: 'address',
        label: 'settings.address',
        icon: 'location_on',
        value: user.value.address,
      },
    ];
  });

  async function loadProfile(): Promise<void> {
    if (!authStore.isAuthenticated || authStore.isAdmin) {
      return;
    }

    loading.value = true;

    try {
      user.value = await getMyProfile();
    } catch (error: unknown) {
      user.value = null;

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          $q.notify({
            type: 'negative',
            message: t('auth.login.messages.loginError'),
          });
        } else if (error.response?.status !== 401) {
          $q.notify({
            type: 'negative',
            message: t('auth.login.messages.connectionError'),
          });
        }
      } else {
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
    user,
    loading,
    profileFields,
    loadProfile,
  };
}
