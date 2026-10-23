<template>
  <q-page class="auth-body">
    <PhraseLibrary />

    <div class="container-form">
      <q-btn
        class="arrow-back"
        icon="arrow_back"
        :aria-label="t('settings.back')"
        to="/"
        flat
        round
        dense
        size="20px"
      />

      <div class="title-form">
        <img src="@/assets/book-logo.svg" :alt="t('header.accessibility.logo')" />

        <h4>{{ t('auth.forgotPassword.title') }}</h4>
      </div>

      <q-form class="forgot-form" @submit.prevent="btnForgotPassword">
        <div class="input-group">
          <label for="forgot-email">
            {{ t('auth.forgotPassword.email') }}
          </label>

          <q-input
            id="forgot-email"
            v-model="email"
            class="input"
            type="email"
            :placeholder="t('auth.forgotPassword.emailPlaceholder')"
            autocomplete="email"
            dense
            outlined
          >
            <template #prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="forgot-cpf">
            {{ t('auth.forgotPassword.cpf') }}
          </label>

          <q-input
            id="forgot-cpf"
            v-model="cpf"
            class="input"
            type="text"
            mask="###.###.###-##"
            :placeholder="t('auth.forgotPassword.cpfPlaceholder')"
            dense
            outlined
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="forgot-password">
            {{ t('auth.forgotPassword.password') }}
          </label>

          <q-input
            id="forgot-password"
            v-model="password"
            class="input"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="t('auth.forgotPassword.passwordPlaceholder')"
            autocomplete="new-password"
            dense
            outlined
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>

            <template #append>
              <q-icon
                :name="showPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                role="button"
                tabindex="0"
                :aria-label="
                  showPassword ? t('settings.edit.confirmPassword') : t('settings.edit.newPassword')
                "
                :aria-pressed="showPassword"
                @click="showPassword = !showPassword"
                @keydown.enter.prevent="showPassword = !showPassword"
                @keydown.space.prevent="showPassword = !showPassword"
              />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="forgot-confirm-password">
            {{ t('auth.forgotPassword.confirmPassword') }}
          </label>

          <q-input
            id="forgot-confirm-password"
            v-model="confirmPassword"
            class="input"
            :type="showConfirmPassword ? 'text' : 'password'"
            :placeholder="t('auth.forgotPassword.confirmPasswordPlaceholder')"
            autocomplete="new-password"
            dense
            outlined
          >
            <template #prepend>
              <q-icon name="lock" />
            </template>

            <template #append>
              <q-icon
                :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                role="button"
                tabindex="0"
                :aria-label="
                  showConfirmPassword
                    ? t('settings.edit.confirmPassword')
                    : t('settings.edit.newPassword')
                "
                :aria-pressed="showConfirmPassword"
                @click="showConfirmPassword = !showConfirmPassword"
                @keydown.enter.prevent="showConfirmPassword = !showConfirmPassword"
                @keydown.space.prevent="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>
        </div>

        <BtnDivider
          :name_confirm="t('auth.forgotPassword.confirmButton')"
          :name_cancel="t('auth.forgotPassword.cancelButton')"
          :action_confirm="btnForgotPassword"
          :action_cancel="btnCancel"
          :loading="loading"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/others/BtnDivider.vue';

import { forgotPassword } from '@/services/authService';
import { isValidEmail } from '@/utils/userValidators';

const $q = useQuasar();
const router = useRouter();
const { t } = useI18n({ useScope: 'global' });

const email = ref('');
const cpf = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

const showPassword = ref(false);
const showConfirmPassword = ref(false);

async function btnForgotPassword() {
  if (loading.value) return;

  if (!email.value.trim() || !cpf.value.trim() || !password.value || !confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: t('auth.forgotPassword.messages.requiredFields'),
    });
    return;
  }

  const formattedEmail = email.value.trim().toLowerCase();

  if (!isValidEmail(formattedEmail)) {
    $q.notify({
      type: 'negative',
      message: t('auth.forgotPassword.messages.invalidEmail'),
    });
    return;
  }

  const cpfNumbers = cpf.value.replace(/\D/g, '');

  if (cpfNumbers.length !== 11) {
    $q.notify({
      type: 'negative',
      message: t('auth.forgotPassword.messages.invalidCpf'),
    });
    return;
  }

  const cpfFormatted = `${cpfNumbers.slice(0, 3)}.${cpfNumbers.slice(3, 6)}.${cpfNumbers.slice(6, 9)}-${cpfNumbers.slice(9, 11)}`;

  if (password.value !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: t('auth.forgotPassword.messages.passwordMismatch'),
    });
    return;
  }

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
      const errors = error.response?.data?.errors;

      console.error('Status:', status);
      console.error('Erros de validação:', errors);

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

async function btnCancel() {
  email.value = '';
  cpf.value = '';
  password.value = '';
  confirmPassword.value = '';
  showPassword.value = false;
  showConfirmPassword.value = false;

  await router.push('/');
}
</script>

<style scoped>
.container-form {
  background-color: var(--bg-card);
  color: var(--text-main);
  width: 100%;
  max-width: 18.75rem;
  border-radius: 1.875rem;
  padding: 1rem 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
}

.arrow-back {
  align-self: flex-start;
  color: var(--text-main);
  margin-bottom: -2rem;
}

.arrow-back:hover {
  opacity: 0.7;
}

.title-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  margin-bottom: 0.75rem;
}

.title-form img {
  width: 2.5rem;
}

.title-form h4 {
  margin: 0;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.forgot-form {
  width: 100%;
}

.input-group {
  margin-bottom: 0.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.15rem;
  color: var(--text-main);
  font-size: 0.85rem;
  line-height: 1.25;
}

.input,
.input :deep(.q-field__control) {
  background-color: var(--bg-input);
  border-radius: 1rem;
}

.input :deep(.q-field__control::before),
.input :deep(.q-field__control::after) {
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.input :deep(.q-field__native) {
  color: var(--text-main);
}

.input :deep(.q-field__native::placeholder) {
  color: var(--text-muted);
  opacity: 1;
}

.input :deep(.q-field__prepend),
.input :deep(.q-field__append) {
  color: var(--text-main);
}
</style>
