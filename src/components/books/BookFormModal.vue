<template>
  <q-dialog v-model="isModalOpen" class="book-modal" persistent @hide="resetModal">
    <q-card class="container-create-books">
      <div class="container-title-book">
        <q-btn
          class="btn-back-modal"
          icon="arrow_back"
          flat
          round
          dense
          :disable="saving"
          :aria-label="t('books.form.back')"
          @click="closeModal"
        />

        <h2 class="title-book-form">
          {{ isEditing ? t('books.form.editTitle') : t('books.form.createTitle') }}
        </h2>
      </div>

      <q-form class="container-form" @submit.prevent="confirmBook">
        <div v-for="field in textFields" :key="field.key" class="input-group">
          <label :for="`book-${field.key}`">{{ field.label }}</label>

          <q-input
            :id="`book-${field.key}`"
            v-model="form[field.key]"
            class="book-input"
            :type="field.type"
            :maxlength="field.key === 'isbn' ? 13 : undefined"
            :disable="saving || (isEditing && field.key === 'isbn')"
            :rules="[requiredRule]"
            dense
            outlined
            hide-bottom-space
          />
        </div>

        <div class="input-group">
          <label for="book-publisher">{{ t('books.form.publisher') }}</label>

          <q-select
            id="book-publisher"
            v-model="form.publisherId"
            class="book-input"
            :options="publishers"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            dense
            outlined
            options-dense
            hide-bottom-space
            :disable="saving"
            :rules="[publisherRule]"
          />
        </div>

        <div class="input-group">
          <label for="book-quantity">
            {{ t('books.form.quantity') }}
          </label>
          <q-input
            id="book-quantity"
            v-model.number="form.quantity"
            class="book-input"
            type="number"
            min="0"
            step="1"
            dense
            outlined
            hide-bottom-space
            :disable="saving"
            :rules="[quantityRule]"
          />
        </div>

        <div class="btns-books">
          <q-btn
            type="submit"
            class="btn-check"
            icon="check"
            :label="t('books.form.confirmButton')"
            no-caps
            unelevated
            :loading="saving"
            :disable="saving"
          />

          <q-btn
            class="btn-cancel"
            icon="close"
            :label="t('books.form.cancelButton')"
            no-caps
            unelevated
            :disable="saving"
            @click="closeModal"
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import type { BookResponse, CreateBookRequest, UpdateBookRequest } from '@/types/books';
import type { PublisherOption } from '@/types/publishers';

const props = withDefaults(
  defineProps<{
    publishers: PublisherOption[];
    saving?: boolean;
  }>(),
  {
    saving: false,
  },
);

const emit = defineEmits<{
  create: [book: CreateBookRequest];
  update: [id: number, book: UpdateBookRequest];
}>();

const { t } = useI18n({ useScope: 'global' });

type TextField = 'title' | 'isbn' | 'genre' | 'releaseDate';

interface BookFormState {
  id: number | null;
  isbn: string;
  title: string;
  genre: string;
  releaseDate: string;
  publisherId: number | null;
  quantity: number | null;
}

const emptyForm = (): BookFormState => ({
  id: null,
  isbn: '',
  title: '',
  genre: '',
  releaseDate: '',
  publisherId: null,
  quantity: 1,
});

const form = reactive<BookFormState>(emptyForm());

const isModalOpen = ref(false);
const isEditing = ref(false);

const textFields = computed<
  {
    key: TextField;
    label: string;
    type: 'text' | 'date';
  }[]
>(() => [
  {
    key: 'title',
    label: t('books.form.name'),
    type: 'text',
  },
  {
    key: 'isbn',
    label: 'ISBN',
    type: 'text',
  },
  {
    key: 'genre',
    label: t('books.form.genre'),
    type: 'text',
  },
  {
    key: 'releaseDate',
    label: t('books.form.releaseDate'),
    type: 'date',
  },
]);

const requiredRule = (value: unknown): boolean | string =>
  value !== null && value !== undefined && String(value).trim() !== ''
    ? true
    : t('books.form.requiredField');

const publisherRule = (value: unknown): boolean | string =>
  typeof value === 'number' ? true : t('books.form.publisherRequired');

const quantityRule = (value: unknown): boolean | string =>
  typeof value === 'number' && Number.isSafeInteger(value) && value >= 0 && value <= 2147483647
    ? true
    : t('books.form.quantityInvalid');

function resetModal(): void {
  isEditing.value = false;
  Object.assign(form, emptyForm());
}

function openCreateModal(): void {
  resetModal();
  isModalOpen.value = true;
}

function openEditModal(book: BookResponse): void {
  resetModal();
  isEditing.value = true;
  Object.assign(form, book);
  isModalOpen.value = true;
}

function closeModal(): void {
  if (!props.saving) {
    isModalOpen.value = false;
  }
}

function confirmBook(): void {
  if (props.saving || form.publisherId === null || quantityRule(form.quantity) !== true) {
    return;
  }

  const data = {
    title: form.title.trim(),
    genre: form.genre.trim(),
    releaseDate: form.releaseDate,
    publisherId: form.publisherId,
    quantity: Number(form.quantity),
  };

  if (isEditing.value) {
    if (form.id !== null) {
      emit('update', form.id, data);
    }
  } else {
    emit('create', {
      ...data,
      isbn: form.isbn.trim(),
    });
  }
}

function closeAfterSave(): void {
  isModalOpen.value = false;
}

defineExpose({
  openCreateModal,
  openEditModal,
  closeModal,
  closeAfterSave,
});
</script>

<style scoped>
.book-modal :deep(.q-dialog__inner) {
  padding: 1rem;
}

.container-create-books {
  width: 32rem;
  max-width: 90vw;
  max-height: 95vh;
  padding: 2rem;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  background-color: var(--bg-card);
  color: var(--text-main);
  box-shadow: none;
}

.container-title-book {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 1.5rem;
}

.title-book-form {
  margin: 0;
  font-size: 1.7rem;
  text-align: center;
}

.btn-back-modal {
  position: absolute;
  left: 0;
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
  flex-shrink: 0;
}

.book-input {
  width: 15rem;
  min-width: 0;
  flex-shrink: 1;
}

.book-input :deep(.q-field__control) {
  min-height: 2rem;
  height: 2rem;
  border-radius: 2rem;
  background-color: var(--bg-input);
  color: var(--text-main);
}

.book-input :deep(.q-field__control::before) {
  border: 0.1rem solid var(--border-color);
}

.book-input :deep(.q-field__control::after) {
  border-radius: 2rem;
  color: var(--border-color);
}

.book-input :deep(.q-field__native),
.book-input :deep(.q-field__input),
.book-input :deep(.q-field__marginal) {
  min-height: 2rem;
  height: 2rem;
  color: var(--text-main);
}

.book-input :deep(.q-field__native),
.book-input :deep(.q-field__input) {
  padding: 0 0.7rem;
}

.btns-books {
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn-check,
.btn-cancel {
  width: 10rem;
  min-height: 2.5rem;
  border-radius: 5rem;
  font-size: 0.9rem;
  font-weight: bold;
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
