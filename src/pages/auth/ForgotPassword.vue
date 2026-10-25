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
            hide-bottom-space
            :error="submitted && !isValidEmail(email)"
            :error-message="
              !email.trim()
                ? t('auth.forgotPassword.validation.emailRequired')
                : t('auth.forgotPassword.messages.invalidEmail')
            "
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
            hide-bottom-space
            :error="submitted && !isValidCpfLength(cpf)"
            :error-message="
              !cpf.trim()
                ? t('auth.forgotPassword.validation.cpfRequired')
                : t('auth.forgotPassword.messages.invalidCpf')
            "
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
            hide-bottom-space
            :error="submitted && !password"
            :error-message="t('auth.forgotPassword.validation.passwordRequired')"
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
            hide-bottom-space
            :error="submitted && (!confirmPassword || password !== confirmPassword)"
            :error-message="
              !confirmPassword
                ? t('auth.forgotPassword.validation.confirmPasswordRequired')
                : t('auth.forgotPassword.messages.passwordMismatch')
            "
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
                    ? t('components.mainInput.password.hide')
                    : t('components.mainInput.password.show')
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
import { useI18n } from 'vue-i18n';

import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/others/BtnDivider.vue';

import { useForgotPassword } from '@/composables/auth/useForgotPassword';

const { t } = useI18n({
  useScope: 'global',
});

const {
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
} = useForgotPassword();
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

.forgot-form {
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
  font-size: 0.85rem;
  font-weight: 500;
  line-height: 1.25;
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
</style>
