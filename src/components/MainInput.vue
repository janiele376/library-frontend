<template>
  <div class="info">
    <p>{{ name }}</p>

    <q-input
      v-model="model"
      class="input"
      :type="type === 'password' && showPassword ? 'text' : type"
      :mask="mask"
      :placeholder="placeholder"
      dense
      outlined
    >
      <template #prepend>
        <q-icon :name="icon" :class="{ 'cursor-pointer': date }">
          <q-popup-proxy v-if="date" ref="datePopup" @before-show="openDate">
            <q-date
              v-model="selectedDate"
              mask="DD/MM/YYYY"
              :options="disableFutureDates ? allowedDates : undefined"
            >
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancelar" color="primary" flat @click="cancelDate" />

                <q-btn label="Confirmar" color="primary" flat @click="confirmDate" />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-icon>
      </template>

      <template #append v-if="password">
        <q-icon
          :name="showPassword ? 'visibility_off' : 'visibility'"
          class="cursor-pointer"
          @click="togglePassword"
        />
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { date as quasarDate } from 'quasar';
import type { QPopupProxy } from 'quasar';

const model = defineModel<string>({ default: '' });

export interface InputForm {
  name: string;
  icon: string;
  mask?: string;
  date?: boolean;
  password?: boolean;
  disableFutureDates?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
}

withDefaults(defineProps<InputForm>(), {
  icon: '',
  mask: '',
  date: false,
  password: false,
  disableFutureDates: false,
  placeholder: '',
});

// VISIBILIDADE DA SENHA
const showPassword = ref(false);

function togglePassword() {
  showPassword.value = !showPassword.value;
}

// CALENDÁRIO
const datePopup = ref<QPopupProxy | null>(null);
const selectedDate = ref('');

function openDate() {
  selectedDate.value = model.value;
}

function confirmDate() {
  if (!selectedDate.value) return;

  model.value = selectedDate.value;
  datePopup.value?.hide();
}

function cancelDate() {
  selectedDate.value = model.value;
  datePopup.value?.hide();
}

// BLOQUEAR DATAS FUTURAS
function allowedDates(value: string) {
  const today = quasarDate.formatDate(Date.now(), 'YYYY/MM/DD');
  return value <= today;
}
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
}

.info p {
  margin-top: 0.35rem;
  margin-bottom: 0.3rem;
  color: var(--text-main);
}

.info .input,
.info .input :deep(.q-field__control) {
  background-color: var(--bg-input);
  border-radius: 1rem;
}

.input :deep(.q-field__control::before),
.input :deep(.q-field__control::after) {
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}

.calendar-icon {
  cursor: pointer;
}
</style>
