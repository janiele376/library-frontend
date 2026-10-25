<template>
  <q-dialog v-model="isOpen">
    <q-card class="rental-modal">
      <div class="container-title-rental">
        <button
          type="button"
          class="btn-back-modal"
          :aria-label="t('rentals.form.back')"
          @click="closeModal"
        >
          <q-icon name="arrow_back" size="1.5rem" />
        </button>

        <h2>{{ modalTitle }}</h2>
      </div>

      <div class="container-form">
        <template v-if="mode === 'create'">
          <div class="input-group">
            <label for="rental-user-id">
              {{ t('rentals.formExtra.userId') }}
            </label>

            <q-input
              id="rental-user-id"
              v-model.number="form.usersId"
              type="number"
              min="1"
              class="form-input"
              borderless
              dense
            />
          </div>

          <div class="input-group">
            <label for="rental-book-id">
              {{ t('rentals.formExtra.bookId') }}
            </label>

            <q-input
              id="rental-book-id"
              v-model.number="form.booksId"
              type="number"
              min="1"
              class="form-input"
              borderless
              dense
            />
          </div>
        </template>

        <template v-else>
          <p class="confirm-message">
            {{ mode === 'renew' ? t('rentals.renew.message') : t('rentals.return.message') }}
          </p>

          <div class="rental-summary">
            <p>
              <strong>{{ t('rentals.form.userSummary') }}</strong>
              {{ selectedRental?.userName }}
            </p>

            <p>
              <strong>{{ t('rentals.form.bookSummary') }}</strong>
              {{ selectedRental?.bookName }}
            </p>
          </div>

          <div class="input-group">
            <label for="rental-date">
              {{ mode === 'renew' ? t('rentals.renew.date') : t('rentals.return.date') }}
            </label>

            <q-input
              id="rental-date"
              :model-value="displayDate"
              type="date"
              class="form-input"
              borderless
              dense
              readonly
            />
          </div>
        </template>

        <div class="btns-rentals">
          <q-btn
            type="button"
            class="btn-check"
            icon="check"
            :label="t('rentals.form.confirmButton')"
            :loading="saving"
            no-caps
            unelevated
            @click="confirmAction"
          />

          <q-btn
            type="button"
            class="btn-cancel"
            icon="close"
            :label="t('rentals.form.cancelButton')"
            :disable="saving"
            no-caps
            unelevated
            @click="closeModal"
          />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { useRentalForm } from '@/composables/rentals/useRentalForm';

const emit = defineEmits<{
  saved: [];
}>();

const { t } = useI18n({ useScope: 'global' });

const {
  isOpen,
  saving,
  mode,
  selectedRental,
  form,
  modalTitle,
  displayDate,
  openCreateModal,
  openRenewModal,
  openReturnModal,
  closeModal,
  confirmAction,
} = useRentalForm({
  onSaved: () => emit('saved'),
});

defineExpose({
  openCreateModal,
  openRenewModal,
  openReturnModal,
});
</script>

<style scoped>
.rental-modal {
  width: 32rem;
  max-width: 90vw;
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  background-color: var(--bg-card);
  color: var(--text-main);
}

.container-title-rental {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.5rem;
}

.container-title-rental h2 {
  margin: 0;
  font-size: 1.7rem;
  text-align: center;
}

.btn-back-modal {
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  color: var(--text-main);
  cursor: pointer;
}

.container-form {
  width: 100%;
  padding: 1.5rem 1.2rem;
  border: 0.1rem solid var(--border-color);
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.input-group label {
  font-size: 0.95rem;
}

.form-input {
  width: 15rem;
  min-height: 2rem;
  padding: 0 0.7rem;
  border: 0.1rem solid var(--border-color);
  border-radius: 2rem;
  background-color: var(--bg-input);
  color: var(--text-main);
}

.confirm-message {
  margin: 0;
  text-align: center;
  font-size: 0.95rem;
}

.rental-summary {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rental-summary p {
  margin: 0;
}

.btns-rentals {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-check,
.btn-cancel {
  min-width: 10rem;
  min-height: 2.5rem;
  border-radius: 5rem;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-check {
  border: 0.2rem solid var(--btn-primary-border);
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-cancel {
  border: 0.2rem solid var(--border-color);
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.btn-check:hover,
.btn-cancel:hover {
  opacity: 0.8;
}
</style>
