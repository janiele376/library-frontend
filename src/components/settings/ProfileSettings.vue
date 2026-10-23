<template>
  <div class="profile-settings">
    <div v-if="loading" class="profile-loading">
      <q-spinner color="primary" size="2.5rem" />
    </div>

    <template v-else-if="user">
      <div class="profile-avatar">
        <q-avatar size="6.5rem">
          <img :src="defaultAvatar" alt="" class="img-user" />
        </q-avatar>

        <strong>{{ user.nameCompleted }}</strong>
      </div>

      <div class="profile-information">
        <div v-for="field in profileFields" :key="field.key" class="information-row">
          <q-icon :name="field.icon" />

          <span class="information-label"> {{ t(field.label) }}: </span>

          <span class="information-value">
            {{ field.value }}
          </span>
        </div>
      </div>

      <div class="profile-actions">
        <q-btn
          no-caps
          unelevated
          class="edit-button"
          :label="t('settings.editInformation')"
          @click="router.push('/settings/edit')"
        />
      </div>
    </template>

    <div v-else class="profile-loading">
      <q-btn flat no-caps icon="refresh" :label="t('settings.profile')" @click="loadProfile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import axios from 'axios';

import defaultAvatar from '@/assets/book-logo.svg';
import { useAuthStore } from '@/stores/authStore';
import { getMyProfile } from '@/services/userService';
import type { UserResponse } from '@/types/user';

const router = useRouter();
const $q = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

const user = ref<UserResponse | null>(null);
const loading = ref(false);

function formatDate(value: string): string {
  const parts = value.split('-');

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts;

  return `${day}/${month}/${year}`;
}

const profileFields = computed(() => {
  if (!user.value) {
    return [];
  }

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
      value: formatDate(user.value.dateBirth),
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

onMounted(() => {
  void loadProfile();
});
</script>

<style scoped>
.profile-settings {
  width: 100%;
}

.profile-loading {
  min-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.profile-avatar .q-avatar {
  border: 2px solid var(--border-color);
}

.profile-avatar strong {
  font-size: 1rem;
}

.profile-information {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2rem;
}

.information-row {
  display: grid;
  grid-template-columns: 1.5rem 9rem minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
}

.information-row > .q-icon {
  font-size: 1.3rem;
}

.information-label {
  font-size: 0.9rem;
  font-weight: 600;
}

.information-value {
  min-width: 0;
  font-size: 0.85rem;
  overflow-wrap: anywhere;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.edit-button {
  min-height: 2.5rem;
  padding: 0 1.5rem;
  border-radius: 5rem;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  font-size: 0.9rem;
}
</style>
