<template>
  <q-form class="form-edit-user" @submit.prevent="emit('save')">
    <div class="container-input">
      <label for="edit-name">
        {{ t('users.editModal.name') }}
      </label>

      <q-input
        id="edit-name"
        :model-value="form.nameCompleted"
        @update:model-value="(value) => updateField('nameCompleted', String(value ?? ''))"
        type="text"
        :placeholder="t('users.editModal.namePlaceholder')"
        :disable="saving"
        outlined
        dense
        hide-bottom-space
        class="edit-input"
      />
    </div>

    <div class="container-input">
      <label for="edit-email">
        {{ t('users.editModal.email') }}
      </label>

      <q-input
        id="edit-email"
        :model-value="form.email"
        @update:model-value="(value) => updateField('email', String(value ?? ''))"
        type="email"
        :placeholder="t('users.editModal.emailPlaceholder')"
        :disable="saving"
        outlined
        dense
        hide-bottom-space
        class="edit-input"
      />
    </div>

    <div class="container-input">
      <label for="edit-phone">
        {{ t('users.editModal.phone') }}
      </label>

      <q-input
        id="edit-phone"
        :model-value="form.phone"
        @update:model-value="(value) => updateField('phone', String(value ?? ''))"
        type="tel"
        mask="(##) #####-####"
        :placeholder="t('users.editModal.phonePlaceholder')"
        :disable="saving"
        outlined
        dense
        hide-bottom-space
        class="edit-input"
      />
    </div>

    <div class="container-input">
      <label for="edit-cpf">
        {{ t('users.editModal.cpf') }}
      </label>

      <q-input
        id="edit-cpf"
        :model-value="form.cpf"
        @update:model-value="(value) => updateField('cpf', String(value ?? ''))"
        type="text"
        mask="###.###.###-##"
        :placeholder="t('users.editModal.cpfPlaceholder')"
        :disable="saving"
        outlined
        dense
        hide-bottom-space
        class="edit-input"
      />
    </div>

    <div class="container-input">
      <label for="edit-birth">
        {{ t('users.editModal.birthDate') }}
      </label>

      <q-input
        id="edit-birth"
        :model-value="form.birthDate"
        @update:model-value="(value) => updateField('birthDate', String(value ?? ''))"
        type="text"
        mask="##/##/####"
        :placeholder="t('users.editModal.birthDatePlaceholder')"
        :disable="saving"
        outlined
        dense
        hide-bottom-space
        class="edit-input"
      />
    </div>

    <div class="container-input">
      <label for="edit-address">
        {{ t('users.editModal.address') }}
      </label>

      <q-input
        id="edit-address"
        :model-value="form.address"
        @update:model-value="(value) => updateField('address', String(value ?? ''))"
        type="text"
        :placeholder="t('users.editModal.addressPlaceholder')"
        :disable="saving"
        outlined
        dense
        hide-bottom-space
        class="edit-input"
      />
    </div>

    <div class="container-buttons">
      <q-btn
        type="button"
        :label="t('users.editModal.cancelButton')"
        no-caps
        unelevated
        class="btn-cancel"
        :disable="saving"
        @click="emit('cancel')"
      />

      <q-btn
        type="submit"
        :label="t('users.editModal.saveButton')"
        no-caps
        unelevated
        class="btn-save"
        :loading="saving"
        :disable="saving"
      />
    </div>
  </q-form>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface EditUserFormData {
  nameCompleted: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: string;
}

const form = defineModel<EditUserFormData>('form', {
  required: true,
});

defineProps<{
  saving: boolean;
}>();

const emit = defineEmits<{
  save: [];
  cancel: [];
}>();

const { t } = useI18n({ useScope: 'global' });

function updateField<K extends keyof EditUserFormData>(field: K, value: EditUserFormData[K]): void {
  form.value = {
    ...form.value,
    [field]: value,
  };
}
</script>

<style scoped>
.form-edit-user {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.container-input {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.container-input label {
  font-size: 0.95rem;
  font-weight: 500;
}

.edit-input {
  width: 100%;
  font-size: 0.9rem;
}

.edit-input :deep(.q-field__control) {
  min-height: 2.5rem;
  height: 2.5rem;
  border-radius: 2rem;
  background-color: var(--bg-input);
  color: var(--text-main);
}

.edit-input :deep(.q-field__control::before) {
  border: 1px solid var(--border-color);
}

.edit-input :deep(.q-field__control::after) {
  border-radius: 2rem;
  color: var(--text-main);
}

.edit-input :deep(.q-field__native),
.edit-input :deep(.q-field__input),
.edit-input :deep(.q-field__marginal) {
  min-height: 2.5rem;
  height: 2.5rem;
  color: var(--text-main);
}

.edit-input :deep(.q-field__native),
.edit-input :deep(.q-field__input) {
  padding: 0 1rem;
}

.container-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
}

.container-buttons .q-btn {
  min-height: 2.5rem;
  padding: 0.5rem 1.5rem;
  border-radius: 2rem;
  font-size: 0.9rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.container-buttons .q-btn:hover {
  opacity: 0.8;
}

.btn-cancel {
  border: 1px solid var(--border-color);
  background-color: transparent;
  color: var(--text-main);
}

.btn-save {
  border: none;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}
</style>
