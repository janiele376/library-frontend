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

      <q-form ref="bookFormRef" class="container-form" novalidate @submit.prevent="confirmBook">
        <div v-for="field in textFields" :key="field.key" class="input-group">
          <label :for="`book-${field.key}`">
            {{ field.label }}
          </label>

          <q-input
            :id="`book-${field.key}`"
            v-model="form[field.key]"
            class="book-input"
            :type="field.type"
            :maxlength="field.key === 'isbn' ? 13 : undefined"
            :disable="saving || (isEditing && field.key === 'isbn')"
            :rules="[requiredRule]"
            lazy-rules="ondemand"
            dense
            outlined
            hide-bottom-space
          />
        </div>

        <div class="input-group">
          <label for="book-publisher">
            {{ t('books.form.publisher') }}
          </label>

          <q-select
            id="book-publisher"
            v-model="form.publisherId"
            class="book-input"
            :options="filteredPublishers"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            use-input
            fill-input
            hide-selected
            input-debounce="0"
            dense
            outlined
            options-dense
            hide-bottom-space
            lazy-rules="ondemand"
            :disable="saving"
            :rules="[publisherRule]"
            @filter="filterPublishers"
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
            lazy-rules="ondemand"
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
            type="button"
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
import { nextTick, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import type { QForm } from 'quasar';
import type { BookResponse, CreateBookRequest, UpdateBookRequest } from '@/types/books';
import type { PublisherOption } from '@/types/publishers';

import { useBookForm } from '@/composables/books/useBookForm';

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

const { t, locale } = useI18n({ useScope: 'global' });

const bookFormRef = ref<QForm | null>(null);
const isModalOpen = ref(false);
const hasValidated = ref(false);

const {
  form,
  isEditing,
  textFields,
  filteredPublishers,
  requiredRule,
  publisherRule,
  quantityRule,
  filterPublishers,
  resetForm,
  fillForm,
  getFormData,
} = useBookForm({
  publishers: () => props.publishers,
});

function resetModal(): void {
  resetForm();
  hasValidated.value = false;
  bookFormRef.value?.resetValidation();
}

function openCreateModal(): void {
  resetModal();
  isModalOpen.value = true;
}

function openEditModal(book: BookResponse): void {
  resetModal();
  fillForm(book);
  isModalOpen.value = true;
}

function closeModal(): void {
  if (!props.saving) {
    isModalOpen.value = false;
  }
}

async function confirmBook(): Promise<void> {
  if (props.saving) return;

  hasValidated.value = true;

  const valid = await bookFormRef.value?.validate();

  if (!valid) return;

  const data = getFormData();

  if (!data) return;

  if (isEditing.value) {
    if (form.id !== null) {
      emit('update', form.id, data as UpdateBookRequest);
    }
  } else {
    emit('create', data as CreateBookRequest);
  }
}

function closeAfterSave(): void {
  isModalOpen.value = false;
}

watch(locale, async () => {
  if (!isModalOpen.value || !hasValidated.value) return;

  await nextTick();
  await bookFormRef.value?.validate();
});

watch(isModalOpen, async (opened) => {
  if (!opened) return;

  await nextTick();
  bookFormRef.value?.resetValidation();
});

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
  overflow-y: auto;
  padding: 2rem;
  box-sizing: border-box;
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
  box-sizing: border-box;
  border: 0.1rem solid var(--border-color);
  border-radius: 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.input-group {
  width: 100%;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 15rem);
  align-items: start;
  gap: 1rem;
}

.input-group label {
  font-size: 0.95rem;
  padding-top: 0.4rem;
  overflow-wrap: anywhere;
}

.book-input {
  width: 100%;
  min-width: 0;
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
  border-radius: 2rem;
}

.book-input :deep(.q-field__control::after) {
  border-radius: 2rem;
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

.book-input :deep(.q-field__bottom) {
  padding: 0.35rem 0.5rem 0;
}

.book-input :deep(.q-field__messages) {
  font-size: 0.75rem;
  line-height: 1.35;
  white-space: normal;
  overflow-wrap: anywhere;
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
  flex: 1;
  max-width: 10rem;
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
