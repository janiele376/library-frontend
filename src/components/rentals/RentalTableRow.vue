<template>
  <div class="rental-table-row">
    <p>{{ rental.userName }}</p>

    <p>{{ rental.bookName }}</p>

    <p>{{ formatDate(rental.startDate) }}</p>

    <p>{{ formatDate(rental.endDate) }}</p>

    <div class="status-container">
      <span class="status" :class="rental.status">
        {{ t(`rentals.status.${rental.status}`) }}
      </span>
    </div>

    <div class="container-btns">
      <q-btn
        type="button"
        class="btn-edit"
        :label="t('rentals.row.renewButton')"
        :disable="isReturned"
        no-caps
        unelevated
        @click="emit('renew')"
      />

      <q-btn
        type="button"
        class="btn-delete"
        :label="t('rentals.row.returnButton')"
        :disable="isReturned"
        no-caps
        unelevated
        @click="emit('return')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import type { RentalData } from '@/types/rentals';

const props = defineProps<{
  rental: RentalData;
}>();

const emit = defineEmits<{
  renew: [];
  return: [];
}>();

const { t } = useI18n();

const isReturned = computed(() => props.rental.status === 'returned');

function formatDate(date: string): string {
  const [year, month, day] = date.split('-');

  if (!year || !month || !day) {
    return date;
  }

  return `${day}/${month}/${year}`;
}
</script>

<style scoped>
.rental-table-row {
  width: 100%;
  min-height: 2.5rem;
  display: grid;
  grid-template-columns: 1.7fr 1.8fr 1fr 1fr 1fr 2fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  background-color: var(--bg-page);
  color: var(--text-main);
  border-radius: 0.3rem;
  font-size: 0.9rem;
}

.rental-table-row p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.status-container {
  display: flex;
  align-items: center;
}

.status {
  padding: 0.25rem 0.6rem;
  border: 0.1rem solid var(--border-color);
  border-radius: 5rem;
  font-size: 0.75rem;
  white-space: nowrap;
}

.status.active {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.status.due_soon {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.status.returned {
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.status.overdue {
  background-color: var(--bg-card);
  color: var(--text-main);
}

.container-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  white-space: nowrap;
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
  flex-shrink: 0;
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

.btn-edit:disabled,
.btn-delete:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
