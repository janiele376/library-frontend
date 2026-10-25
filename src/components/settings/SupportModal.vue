<template>
  <q-dialog v-model="open">
    <q-card class="support-card">
      <q-card-section>
        <h3>{{ t('settings.edit.supportTitle') }}</h3>
        <p>{{ t('settings.edit.supportDescription') }}</p>
      </q-card-section>

      <q-form @submit.prevent="send">
        <q-card-section class="support-fields">
          <label>{{ t('settings.edit.supportEmail') }}</label>

          <q-input
            v-model.trim="email"
            type="email"
            outlined
            dense
            :placeholder="t('settings.edit.supportEmailPlaceholder')"
            :rules="[
              (value) => !!String(value ?? '').trim() || t('settings.edit.required'),
              (value) => isValidEmail(String(value ?? '')) || t('settings.edit.invalidEmail'),
            ]"
          />

          <label>{{ t('settings.edit.supportMessage') }}</label>

          <q-input
            v-model.trim="message"
            type="textarea"
            outlined
            :placeholder="t('settings.edit.supportMessagePlaceholder')"
            :rules="[(value) => !!String(value ?? '').trim() || t('settings.edit.required')]"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            type="submit"
            unelevated
            no-caps
            class="primary-button"
            :label="t('settings.edit.send')"
          />

          <q-btn
            unelevated
            no-caps
            class="secondary-button"
            :label="t('settings.edit.close')"
            @click="open = false"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import { isValidEmail } from '@/utils/userValidators';

const props = defineProps<{ modelValue: boolean }>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean];
}>();

const { t } = useI18n({ useScope: 'global' });
const $q = useQuasar();

const email = ref('');
const message = ref('');

const open = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit('update:modelValue', value),
});

function send() {
  $q.notify({
    type: 'info',
    message: t('settings.edit.supportPreviewOnly'),
  });

  open.value = false;
}
</script>

<style scoped>
.support-card {
  width: 24rem;
  max-width: 90vw;
  padding: 1rem;
  background: var(--bg-page);
  color: var(--text-main);
  border: 2px solid var(--border-color);
  border-radius: 1.25rem;
}

.support-card h3 {
  margin: 0;
  font-size: 1.2rem;
  text-align: center;
}

.support-card p {
  color: var(--text-muted);
  font-size: 0.85rem;
  text-align: center;
}

.support-fields {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.support-fields label {
  font-size: 0.85rem;
  font-weight: bold;
}

.support-fields :deep(.q-field__control) {
  background: var(--bg-input);
}

.support-fields :deep(.q-field__native) {
  color: var(--text-main);
}

.primary-button,
.secondary-button {
  min-width: 7rem;
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
