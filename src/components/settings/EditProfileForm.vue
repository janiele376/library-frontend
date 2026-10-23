<template>
  <div v-if="loading" class="profile-loading">
    <q-spinner color="primary" size="2.5rem" />
  </div>

  <template v-else-if="loaded">
    <div class="profile-avatar">
      <q-avatar size="7rem" class="avatar">
        <img :src="defaultAvatar" alt="" />
      </q-avatar>

      <strong>{{ form.nameCompleted }}</strong>
    </div>

    <q-separator class="separator" />

    <q-form @submit.prevent="save">
      <div class="fields">
        <div class="field-row">
          <q-icon name="person" />

          <label for="nameCompleted"> {{ t('auth.register.name') }}: </label>

          <q-input
            id="nameCompleted"
            v-model="form.nameCompleted"
            outlined
            dense
            hide-bottom-space
          />
        </div>

        <div v-for="field in profileFields" :key="field.key" class="field-row">
          <q-icon :name="field.icon" />

          <label :for="field.key"> {{ t(field.label) }}: </label>

          <q-input
            :id="field.key"
            v-model="form[field.key]"
            outlined
            dense
            hide-bottom-space
            :readonly="field.readonly"
            :class="{ 'readonly-field': field.readonly }"
          />
        </div>
      </div>

      <q-separator class="separator" />

      <div class="fields">
        <div v-for="field in passwordFields" :key="field.key" class="field-row">
          <q-icon name="key" />

          <label :for="field.key"> {{ t(field.label) }}: </label>

          <q-input
            :id="field.key"
            v-model="form[field.key]"
            outlined
            dense
            :type="visiblePasswords[field.key] ? 'text' : 'password'"
          >
            <template #append>
              <q-icon
                :name="visiblePasswords[field.key] ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="visiblePasswords[field.key] = !visiblePasswords[field.key]"
              />
            </template>
          </q-input>
        </div>
      </div>

      <div class="help">
        <q-btn flat no-caps :label="t('settings.edit.needHelp')" @click="supportOpen = true" />
      </div>

      <q-separator class="separator" />

      <div class="actions">
        <q-btn
          type="submit"
          unelevated
          no-caps
          class="primary-button"
          :label="t('settings.edit.confirm')"
          :loading="saving"
          :disable="saving"
        />

        <span>{{ t('settings.edit.or') }}</span>

        <q-btn
          unelevated
          no-caps
          class="secondary-button"
          :label="t('settings.edit.cancel')"
          :disable="saving"
          @click="router.push('/settings')"
        />
      </div>
    </q-form>
  </template>

  <div v-else class="profile-loading">
    <q-btn flat no-caps icon="refresh" :label="t('settings.edit.retry')" @click="loadProfile" />
  </div>

  <SupportModal v-model="supportOpen" />
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';
import axios from 'axios';

import SupportModal from './SupportModal.vue';
import defaultAvatar from '@/assets/book-logo.svg';

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

const router = useRouter();
const $q = useQuasar();
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

const loading = ref(false);
const saving = ref(false);
const loaded = ref(false);
const originalUser = ref<UserResponse | null>(null);
const supportOpen = ref(false);

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
  } catch (error) {
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

onMounted(() => {
  void loadProfile();
});
</script>

<style scoped>
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

.avatar {
  position: relative;
  border: 2px solid var(--border-color);
  overflow: hidden;
}

.separator {
  margin: 1.2rem 0;
  background: var(--border-color);
}

.fields {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.field-row {
  display: grid;
  grid-template-columns: 1.5rem 10rem minmax(0, 1fr);
  align-items: center;
  gap: 0.7rem;
}

.field-row > .q-icon {
  font-size: 1.2rem;
}

.field-row label {
  font-size: 0.9rem;
}

.field-row :deep(.q-field__control) {
  min-height: 2rem;
  height: 2rem;
  border-radius: 5rem;
  background: var(--bg-input);
}

.field-row :deep(.q-field__native) {
  color: var(--text-main);
  font-size: 0.8rem;
}

.field-row :deep(.q-field__append) {
  color: var(--text-main);
}

.readonly-field :deep(.q-field__control) {
  background: var(--bg-input-readonly);
}

.help {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.5rem;
}

.help .q-btn {
  color: var(--text-main);
  text-decoration: underline;
}

.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.primary-button,
.secondary-button {
  min-width: 7.5rem;
  border-radius: 5rem;
}

.primary-button {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.secondary-button {
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 1px solid var(--btn-secondary-border);
}
</style>
