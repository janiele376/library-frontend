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
            <label for="rental-user-id">ID do usuário</label>

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
            <label for="rental-book-id">ID do livro</label>

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
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import { createRental, renewRental, returnRental } from '@/services/rentalService';

import type { RentalData } from '@/types/rentals';

type ModalMode = 'create' | 'renew' | 'return';

const emit = defineEmits<{
  saved: [];
}>();

const { t } = useI18n();
const $q = useQuasar();

const isOpen = ref(false);
const saving = ref(false);
const mode = ref<ModalMode>('create');
const selectedRental = ref<RentalData | null>(null);

const form = ref({
  usersId: null as number | null,
  booksId: null as number | null,
});

const modalTitle = computed(() => {
  if (mode.value === 'renew') {
    return t('rentals.renew.title');
  }

  if (mode.value === 'return') {
    return t('rentals.return.title');
  }

  return t('rentals.form.createTitle');
});

const displayDate = computed(() => {
  if (!selectedRental.value) {
    return '';
  }

  if (mode.value === 'renew') {
    const [year, month, day] = selectedRental.value.endDate.split('-').map(Number);

    if (!year || !month || !day) {
      return '';
    }

    const date = new Date(Date.UTC(year, month - 1, day));
    date.setUTCDate(date.getUTCDate() + 14);

    return date.toISOString().slice(0, 10);
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
});

function openCreateModal() {
  mode.value = 'create';
  selectedRental.value = null;

  form.value = {
    usersId: null,
    booksId: null,
  };

  isOpen.value = true;
}

function openRenewModal(rental: RentalData) {
  mode.value = 'renew';
  selectedRental.value = rental;
  isOpen.value = true;
}

function openReturnModal(rental: RentalData) {
  mode.value = 'return';
  selectedRental.value = rental;
  isOpen.value = true;
}

function closeModal() {
  if (saving.value) return;

  isOpen.value = false;
}

async function confirmAction() {
  if (saving.value) return;

  if (mode.value === 'create') {
    const { usersId, booksId } = form.value;

    if (
      !Number.isSafeInteger(usersId) ||
      !Number.isSafeInteger(booksId) ||
      usersId === null ||
      booksId === null ||
      usersId <= 0 ||
      booksId <= 0
    ) {
      $q.notify({
        type: 'negative',
        message: 'Informe IDs válidos para o usuário e o livro.',
      });

      return;
    }
  }

  saving.value = true;

  try {
    if (mode.value === 'create') {
      await createRental({
        usersId: Number(form.value.usersId),
        booksId: Number(form.value.booksId),
      });
    } else {
      const rental = selectedRental.value;

      if (!rental) return;

      const rentalId = Number(rental.id);

      if (!Number.isSafeInteger(rentalId) || rentalId <= 0) {
        throw new Error('ID do empréstimo inválido.');
      }

      if (mode.value === 'renew') {
        await renewRental(rentalId);
      } else {
        await returnRental(rentalId);
      }
    }

    $q.notify({
      type: 'positive',
      message: 'Operação realizada com sucesso!',
    });

    isOpen.value = false;
    emit('saved');
  } catch (error) {
    console.error('Erro na operação de aluguel:', error);

    $q.notify({
      type: 'negative',
      message: 'Não foi possível concluir a operação. Confira os dados.',
    });
  } finally {
    saving.value = false;
  }
}

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
