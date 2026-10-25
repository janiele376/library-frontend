<template>
  <q-page class="auth-body">
    <PhraseLibrary />

    <div class="container-form">
      <q-btn
        class="arrow-back"
        icon="arrow_back"
        :aria-label="t('auth.register.back')"
        to="/"
        flat
        round
        dense
        size="20px"
      />

      <div class="title-form">
        <img src="@/assets/book-logo.svg" :alt="t('header.accessibility.logo')" />
        <h4>{{ t('auth.register.title') }}</h4>
      </div>

      <q-form class="register-form" @submit.prevent="btnRegister">
        <div class="input-group">
          <label for="register-name">
            {{ t('auth.register.name') }}
          </label>

          <q-input
            id="register-name"
            v-model="nameCompleted"
            class="input"
            type="text"
            :placeholder="t('auth.register.namePlaceholder')"
            autocomplete="name"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && !isValidFullName(nameCompleted)"
            :error-message="
              !nameCompleted.trim()
                ? t('auth.register.validation.nameRequired')
                : t('auth.register.validation.invalidName')
            "
          >
            <template #prepend>
              <q-icon name="person" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="register-birth">
            {{ t('auth.register.dateBirth') }}
          </label>

          <q-input
            id="register-birth"
            v-model="dateBirth"
            class="input"
            type="text"
            mask="##/##/####"
            :placeholder="t('auth.register.dateBirthPlaceholder')"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && !formatDateToISO(dateBirth)"
            :error-message="
              !dateBirth.trim()
                ? t('auth.register.validation.birthDateRequired')
                : t('auth.register.messages.invalidBirthDate')
            "
          >
            <template #prepend>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="datePopup" @before-show="openDate">
                  <q-date v-model="selectedDate" mask="DD/MM/YYYY" :options="allowedDates">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn
                        :label="t('components.mainInput.calendar.cancelButton')"
                        color="primary"
                        flat
                        no-caps
                        @click="handleCancelDate"
                      />

                      <q-btn
                        :label="t('components.mainInput.calendar.confirmButton')"
                        color="primary"
                        flat
                        no-caps
                        @click="handleConfirmDate"
                      />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="register-email">
            {{ t('auth.register.email') }}
          </label>

          <q-input
            id="register-email"
            v-model="email"
            class="input"
            type="email"
            :placeholder="t('auth.register.emailPlaceholder')"
            autocomplete="email"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && !isValidEmail(email)"
            :error-message="
              !email.trim()
                ? t('auth.register.validation.emailRequired')
                : t('auth.register.messages.invalidEmail')
            "
          >
            <template #prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="register-cpf">
            {{ t('auth.register.cpf') }}
          </label>

          <q-input
            id="register-cpf"
            v-model="cpf"
            class="input"
            type="text"
            mask="###.###.###-##"
            :placeholder="t('auth.register.cpfPlaceholder')"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && !isValidCPF(cpf)"
            :error-message="
              !cpf.trim()
                ? t('auth.register.validation.cpfRequired')
                : t('auth.register.messages.invalidCpf')
            "
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="register-phone">
            {{ t('auth.register.phone') }}
          </label>

          <q-input
            id="register-phone"
            v-model="phone"
            class="input"
            type="tel"
            mask="(##) #####-####"
            :placeholder="t('auth.register.phonePlaceholder')"
            autocomplete="tel"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && !isValidPhone(phone)"
            :error-message="
              !phone.trim()
                ? t('auth.register.validation.phoneRequired')
                : t('auth.register.messages.invalidPhone')
            "
          >
            <template #prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="register-address">
            {{ t('auth.register.address') }}
          </label>

          <q-input
            id="register-address"
            v-model="address"
            class="input"
            type="text"
            :placeholder="t('auth.register.addressPlaceholder')"
            autocomplete="street-address"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && !isValidAddress(address)"
            :error-message="t('auth.register.validation.addressRequired')"
          >
            <template #prepend>
              <q-icon name="location_on" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="register-password">
            {{ t('auth.register.password') }}
          </label>

          <q-input
            id="register-password"
            v-model="password"
            class="input"
            :type="showPassword ? 'text' : 'password'"
            :placeholder="t('auth.register.passwordPlaceholder')"
            autocomplete="new-password"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && !password"
            :error-message="t('auth.register.validation.passwordRequired')"
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
          <label for="register-confirm-password">
            {{ t('auth.register.confirmPassword') }}
          </label>

          <q-input
            id="register-confirm-password"
            v-model="confirmPassword"
            class="input"
            :type="showConfirmPassword ? 'text' : 'password'"
            :placeholder="t('auth.register.confirmPasswordPlaceholder')"
            autocomplete="new-password"
            :disable="loading"
            dense
            outlined
            hide-bottom-space
            :error="submitted && (!confirmPassword || password !== confirmPassword)"
            :error-message="
              !confirmPassword
                ? t('auth.register.validation.confirmPasswordRequired')
                : t('auth.register.messages.passwordMismatch')
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
          :name_confirm="t('auth.register.confirmButton')"
          :name_cancel="t('auth.register.cancelButton')"
          :action_confirm="btnRegister"
          :action_cancel="btnCancel"
          :loading="loading"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { QPopupProxy } from 'quasar';

import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/others/BtnDivider.vue';

import { useRegister } from '@/composables/auth/useRegister';

const { t } = useI18n({ useScope: 'global' });

const datePopup = ref<QPopupProxy | null>(null);

const {
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
} = useRegister();

function handleConfirmDate(): void {
  if (confirmDate()) {
    datePopup.value?.hide();
  }
}

function handleCancelDate(): void {
  cancelDate();
  datePopup.value?.hide();
}
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

.register-form {
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
