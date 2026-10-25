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
            hide-bottom-space
            :error="submitted && (!email.trim() || !isValidEmail(email))"
            :error-message="
              !email.trim()
                ? t('auth.login.validation.emailRequired')
                : t('auth.login.validation.invalidEmail')
            "
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
            hide-bottom-space
            :error="submitted && !password.trim()"
            :error-message="t('auth.login.validation.passwordRequired')"
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
import { useI18n } from 'vue-i18n';

import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/others/BtnDivider.vue';
import AuthFooter from '@/components/auth/AuthFooter.vue';

import { useLogin } from '@/composables/auth/useLogin';

const { t } = useI18n({
  useScope: 'global',
});

const {
  email,
  password,
  showPassword,
  loading,
  submitted,
  isValidEmail,
  togglePassword,
  btnLogin,
} = useLogin();
</script>

<style scoped>
.container-form {
  background-color: var(--bg-card);
  color: var(--text-main);
  width: 100%;
  max-width: 21rem;
  border-radius: 1.875rem;
  padding: 1.75rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  box-sizing: border-box;
}

.title-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  margin-bottom: 1.5rem;
}

.title-form img {
  width: 2.75rem;
  height: auto;
}

.title-form h4 {
  margin: 0;
  font-size: 1.55rem;
  font-weight: 700;
  line-height: 1.2;
  text-align: center;
}

.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.input-group label {
  display: block;
  color: var(--text-main);
  font-size: 0.9rem;
  font-weight: 500;
}

.input {
  width: 100%;
}

.input :deep(.q-field__control) {
  background-color: var(--bg-input);
  border-radius: 1rem;
}

.input :deep(.q-field__control::before) {
  border: 1px solid var(--border-color);
  border-radius: 1rem;
}

.input :deep(.q-field__control::after) {
  border-radius: 1rem;
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

.input :deep(.q-field__bottom) {
  padding: 0.35rem 0.25rem 0;
}

.input :deep(.q-field__messages) {
  font-size: 0.75rem;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.forgot-password {
  display: flex;
  justify-content: flex-end;
  margin-top: -0.25rem;
  margin-bottom: 0.25rem;
}

.btn-forgot-password {
  color: var(--text-main);
  font-size: 0.85rem;
  padding: 0;
  min-height: auto;
  transition: opacity 0.2s ease;
}

.btn-forgot-password:hover {
  opacity: 0.75;
}
</style>
