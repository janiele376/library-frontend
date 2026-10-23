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
                        @click="cancelDate"
                      />

                      <q-btn
                        :label="t('components.mainInput.calendar.confirmButton')"
                        color="primary"
                        flat
                        no-caps
                        @click="confirmDate"
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
                :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
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
                :aria-label="showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'"
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
import { useQuasar, date as quasarDate } from 'quasar';
import type { QPopupProxy } from 'quasar';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/others/BtnDivider.vue';

import { register } from '@/services/authService';

import { formatDateToISO } from '@/utils/dateUtils';
import { isValidCPF } from '@/utils/cpfValidator';

import {
  isValidFullName,
  isValidEmail,
  isValidPhone,
  isValidAddress,
} from '@/utils/userValidators';

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

const datePopup = ref<QPopupProxy | null>(null);
const selectedDate = ref('');

function allowedDates(value: string): boolean {
  const today = quasarDate.formatDate(Date.now(), 'YYYY/MM/DD');

  return value <= today;
}

function openDate(): void {
  selectedDate.value = dateBirth.value;
}

function confirmDate(): void {
  if (!selectedDate.value) return;

  dateBirth.value = selectedDate.value;
  datePopup.value?.hide();
}

function cancelDate(): void {
  selectedDate.value = dateBirth.value;
  datePopup.value?.hide();
}

function notifyError(message: string): void {
  $q.notify({
    type: 'negative',
    message,
  });
}

async function btnRegister(): Promise<void> {
  if (loading.value) return;

  const name = nameCompleted.value.trim();
  const userEmail = email.value.trim().toLowerCase();
  const userPhone = phone.value.trim();
  const userCpf = cpf.value.trim();
  const userAddress = address.value.trim();

  if (
    !name ||
    !dateBirth.value ||
    !userEmail ||
    !userCpf ||
    !userPhone ||
    !userAddress ||
    !password.value ||
    !confirmPassword.value
  ) {
    notifyError(t('auth.register.messages.requiredFields'));
    return;
  }

  if (!isValidFullName(name)) {
    notifyError('Informe nome e sobrenome válidos.');
    return;
  }

  if (!isValidEmail(userEmail)) {
    notifyError(t('auth.register.messages.invalidEmail'));
    return;
  }

  if (!isValidCPF(userCpf)) {
    notifyError(t('auth.register.messages.invalidCpf'));
    return;
  }

  if (!isValidPhone(userPhone)) {
    notifyError(t('auth.register.messages.invalidPhone'));
    return;
  }

  if (!isValidAddress(userAddress)) {
    notifyError('Informe um endereço válido.');
    return;
  }

  const formattedDate = formatDateToISO(dateBirth.value);

  if (!formattedDate) {
    notifyError(t('auth.register.messages.invalidBirthDate'));
    return;
  }

  if (password.value !== confirmPassword.value) {
    notifyError(t('auth.register.messages.passwordMismatch'));
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
      console.error('Erro inesperado:', error);

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

  showPassword.value = false;
  showConfirmPassword.value = false;
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

.register-form {
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
