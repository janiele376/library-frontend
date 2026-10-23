<template>
  <q-page class="auth-body">
    <PhraseLibrary />

    <div class="container-form">
      <div class="title-form">
        <img src="@/assets/book-logo.svg" :alt="t('header.accessibility.logo')" />
        <h4>{{ t('auth.login.title') }}</h4>
      </div>

      <q-form class="login-form" @submit.prevent="btnLogin">
        <div class="input-group">
          <label for="login-email">
            {{ t('auth.login.email') }}
          </label>

          <q-input
            id="login-email"
            v-model="email"
            class="input"
            type="email"
            :placeholder="t('auth.login.emailPlaceholder')"
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
          <label for="login-password">
            {{ t('auth.login.password') }}
          </label>

          <q-input
            id="login-password"
            v-model="password"
            class="input"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="t('auth.login.passwordPlaceholder')"
            autocomplete="current-password"
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
                  showPassword
                    ? t('components.mainInput.password.hide')
                    : t('components.mainInput.password.show')
                "
                :aria-pressed="showPassword"
                @click="togglePassword"
                @keydown.enter.prevent="togglePassword"
                @keydown.space.prevent="togglePassword"
              />
            </template>
          </q-input>
        </div>

        <div class="forgot-password">
          <q-btn
            flat
            dense
            no-caps
            class="btn-forgot-password"
            :label="t('auth.login.forgotPassword')"
            to="/forgot-password"
          />
        </div>

        <BtnDivider
          :name_confirm="t('auth.login.confirmButton')"
          :name_cancel="t('auth.login.registerButton')"
          path_cancel="/register"
          :action_confirm="btnLogin"
          :loading="loading"
        />
      </q-form>
    </div>
  </q-page>

  <AuthFooter />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/others/BtnDivider.vue';
import AuthFooter from '@/components/auth/AuthFooter.vue';
import { useAuthStore } from '@/stores/authStore';

const $q = useQuasar();
const router = useRouter();
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const loading = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

async function btnLogin() {
  if (loading.value) return;

  if (!email.value.trim() || !password.value) {
    $q.notify({
      type: 'warning',
      message: t('auth.login.messages.requiredFields'),
    });
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

.login-form {
  width: 100%;
}

.input-group {
  margin-bottom: 0.65rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.2rem;
  color: var(--text-main);
  font-size: 0.9rem;
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

.forgot-password {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.75rem;
}

.btn-forgot-password {
  color: var(--text-main);
  font-size: 0.85rem;
  padding: 0;
  min-height: auto;
}
</style>
