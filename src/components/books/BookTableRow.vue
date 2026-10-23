<template>
  <div class="book-table-row">
    <p>{{ id }}</p>

    <p>{{ code }}</p>

    <p>{{ name }}</p>

    <p>{{ publisher }}</p>

    <p>{{ releaseDate }}</p>

    <div class="quantity-container">
      <span>{{ quantity }}</span>

      <span
        class="quantity-status"
        :class="{
          'status-unavailable': quantity === 0,
          'status-last': quantity === 1,
          'status-available': quantity > 1,
        }"
      >
        {{ availabilityLabel }}
      </span>
    </div>

    <div class="container-btns">
      <q-btn
        type="button"
        class="btn-edit"
        :label="t('books.row.editButton')"
        no-caps
        unelevated
        @click="emit('edit')"
      />

      <q-btn
        type="button"
        class="btn-delete"
        :label="t('books.row.deleteButton')"
        no-caps
        unelevated
        @click="emit('delete')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  id: number;
  code: string;
  name: string;
  publisher: string;
  releaseDate: string;
  quantity: number;
}>();

const emit = defineEmits<{
  edit: [];
  delete: [];
}>();

const { t } = useI18n();

const availabilityLabel = computed(() => {
  if (props.quantity <= 0) {
    return 'Indisponível';
  }

  if (props.quantity === 1) {
    return 'Último exemplar';
  }

  return 'Disponível';
});
</script>

<style scoped>
.book-table-row {
  width: 100%;
  min-height: 2.5rem;
  display: grid;
  grid-template-columns: 0.5fr 0.9fr 2fr 1.6fr 1.4fr 0.8fr 1.6fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  background-color: var(--bg-page);
  color: var(--text-main);
  border-radius: 0.3rem;
  font-size: 0.9rem;
}

.book-table-row p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.quantity-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
  min-width: 0;
}

.quantity-status {
  font-size: 0.7rem;
  font-weight: 600;
  white-space: nowrap;
}

.status-available {
  color: #219653;
}

.status-last {
  color: #d48a00;
}

.status-unavailable {
  color: #eb5757;
}

.container-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
}

.btn-edit,
.btn-delete {
  min-height: 1.7rem;
  padding: 0.2rem 0.7rem;
  border-radius: 5rem;
  font-size: 0.75rem;
  font-weight: 400;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-edit {
  border: 0.1rem solid var(--btn-primary-border);
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-delete {
  border: 0.1rem solid var(--border-color);
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.btn-edit:hover,
.btn-delete:hover {
  opacity: 0.7;
}
</style>
