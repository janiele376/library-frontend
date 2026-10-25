<template>
  <q-dialog v-model="isOpen" persistent>
    <q-card class="publisher-modal">
      <div class="modal-header">
        <q-btn
          icon="arrow_back"
          class="btn-back"
          :aria-label="t('publishers.form.back')"
          flat
          round
          dense
          :disable="saving"
          @click="closeModal"
        />

        <h2>
          {{ isEditing ? t('publishers.form.editTitle') : t('publishers.form.createTitle') }}
        </h2>
      </div>

      <q-form
        ref="publisherFormRef"
        class="publisher-form"
        novalidate
        @submit.prevent="savePublisher"
        @validation-error="hasValidated = true"
      >
        <div class="input-group">
          <label for="publisher-name">
            {{ t('publishers.form.name') }}
          </label>

          <q-input
            id="publisher-name"
            v-model="form.name"
            class="input"
            type="text"
            autocomplete="organization"
            maxlength="150"
            dense
            outlined
            hide-bottom-space
            :disable="saving"
            :rules="publisherRules.name"
            lazy-rules="ondemand"
          >
            <template #prepend>
              <q-icon name="business" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="publisher-cnpj">
            {{ t('publishers.form.cnpj') }}
          </label>

          <q-input
            id="publisher-cnpj"
            v-model="form.cnpj"
            class="input"
            mask="##.###.###/####-##"
            dense
            outlined
            hide-bottom-space
            :disable="isEditing || saving"
            :rules="publisherRules.cnpj"
            lazy-rules="ondemand"
          >
            <template #prepend>
              <q-icon name="badge" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="publisher-email">
            {{ t('publishers.form.email') }}
          </label>

          <q-input
            id="publisher-email"
            v-model="form.email"
            class="input"
            type="text"
            inputmode="email"
            autocomplete="email"
            dense
            outlined
            hide-bottom-space
            :disable="saving"
            :rules="publisherRules.email"
            lazy-rules="ondemand"
          >
            <template #prepend>
              <q-icon name="email" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="publisher-phone">
            {{ t('publishers.form.phone') }}
          </label>

          <q-input
            id="publisher-phone"
            v-model="form.phone"
            class="input"
            type="tel"
            mask="(##) #####-####"
            autocomplete="tel"
            dense
            outlined
            hide-bottom-space
            :disable="saving"
            :rules="publisherRules.phone"
            lazy-rules="ondemand"
          >
            <template #prepend>
              <q-icon name="phone" />
            </template>
          </q-input>
        </div>

        <div class="input-group">
          <label for="publisher-address">
            {{ t('publishers.form.address') }}
          </label>

          <q-input
            id="publisher-address"
            v-model="form.address"
            class="input"
            type="text"
            autocomplete="street-address"
            maxlength="255"
            dense
            outlined
            hide-bottom-space
            :disable="saving"
            :rules="publisherRules.address"
            lazy-rules="ondemand"
          >
            <template #prepend>
              <q-icon name="location_on" />
            </template>
          </q-input>
        </div>

        <div class="modal-actions">
          <q-btn
            class="btn-confirm"
            icon="check"
            :label="t('publishers.form.confirmButton')"
            type="submit"
            :loading="saving"
            :disable="saving"
            no-caps
            unelevated
          />

          <q-btn
            class="btn-cancel"
            icon="close"
            :label="t('publishers.form.cancelButton')"
            type="button"
            :disable="saving"
            no-caps
            unelevated
            @click="closeModal"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue';
import type { QForm } from 'quasar';
import { useI18n } from 'vue-i18n';

import { usePublisherForm } from '@/composables/publishers/usePublisherForm';

import {
  validateName,
  validateCnpj,
  validateEmail,
  validatePhone,
  validateAddress,
} from '@/utils/publisherValidation';

import type { ValidationResult } from '@/utils/publisherValidation';

const { t, locale } = useI18n({ useScope: 'global' });

const emit = defineEmits<{
  saved: [];
}>();

const publisherFormRef = ref<QForm | null>(null);
const hasValidated = ref(false);

const {
  form,
  isOpen,
  isEditing,
  saving,
  openCreateModal,
  openEditModal,
  closeModal,
  savePublisher,
} = usePublisherForm(() => emit('saved'));

function translateValidation(result: ValidationResult): true | string {
  return result === true ? true : t(result);
}

const publisherRules = computed(() => ({
  name: [(value: string) => translateValidation(validateName(value))],
  cnpj: [(value: string) => translateValidation(validateCnpj(value))],
  email: [(value: string) => translateValidation(validateEmail(value))],
  phone: [(value: string) => translateValidation(validatePhone(value))],
  address: [(value: string) => translateValidation(validateAddress(value))],
}));

watch(locale, async () => {
  if (!isOpen.value || !hasValidated.value) return;

  await nextTick();
  await publisherFormRef.value?.validate();
});

watch(isOpen, async (opened) => {
  if (!opened) {
    hasValidated.value = false;
    return;
  }

  hasValidated.value = false;

  await nextTick();
  publisherFormRef.value?.resetValidation();
});

defineExpose({
  openCreateModal,
  openEditModal,
});
</script>

<style scoped>
.publisher-modal {
  width: 32rem;
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  padding: 1.5rem;
  box-sizing: border-box;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  background-color: var(--bg-card);
  color: var(--text-main);
}

.modal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
  min-height: 2rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}

.btn-back {
  position: absolute;
  left: 0;
  color: var(--text-main);
}

.publisher-form {
  width: 100%;
  padding: 1rem;
  border: 1px solid var(--border-color);
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  box-sizing: border-box;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  min-width: 0;
}

.input-group label {
  font-size: 0.9rem;
  font-weight: 500;
  line-height: 1.25;
  color: var(--text-main);
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

.input :deep(.q-field__prepend) {
  color: var(--text-main);
}

.input :deep(.q-field__bottom) {
  padding: 0.35rem 0.5rem 0;
}

.input :deep(.q-field__messages) {
  font-size: 0.75rem;
  line-height: 1.35;
  white-space: normal;
  overflow-wrap: anywhere;
}

.modal-actions {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.75rem;
}

.btn-confirm,
.btn-cancel {
  flex: 1;
  min-width: min(100%, 9rem);
  min-height: 2.5rem;
  border-radius: 5rem;
  font-size: 0.85rem;
  font-weight: 700;
}

.btn-confirm {
  border: 1px solid var(--btn-primary-border);
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-cancel {
  border: 1px solid var(--btn-secondary-border);
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.btn-confirm:hover,
.btn-cancel:hover {
  opacity: 0.8;
}
</style>
