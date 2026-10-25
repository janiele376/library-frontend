<template>
  <div class="container-table">
    <p>{{ user.id }}</p>

    <p>{{ user.nameCompleted }}</p>

    <p>{{ user.cpf }}</p>

    <p>{{ formatDate(user.dateBirth) }}</p>

    <p>{{ user.address }}</p>

    <div class="container-btns">
      <q-btn
        type="button"
        :label="t('users.row.editButton')"
        no-caps
        unelevated
        rounded
        class="btn-edit-user"
        @click="emit('edit', user.id)"
      />

      <q-btn
        type="button"
        :label="t('users.row.deleteButton')"
        no-caps
        unelevated
        rounded
        class="btn-delete-user"
        @click="emit('delete', user)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { UserResponse } from '@/types/user';

defineProps<{
  user: UserResponse;
}>();

const { t } = useI18n({ useScope: 'global' });

const emit = defineEmits<{
  edit: [id: number];
  delete: [user: UserResponse];
}>();

function formatDate(value: string): string {
  const parts = value.split('-');

  if (parts.length !== 3) {
    return value;
  }

  const [year, month, day] = parts;

  return `${day}/${month}/${year}`;
}
</script>

<style scoped>
.container-table {
  width: 100%;
  display: grid;
  grid-template-columns: 0.5fr 1.5fr 1.2fr 1.2fr 1.8fr 1.5fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  border-radius: 0.5rem;
  background-color: var(--bg-page);
  color: var(--text-main);
}

.container-table p {
  margin: 0;
}

.container-btns {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.btn-edit-user,
.btn-delete-user {
  min-height: 2rem;
  padding: 0.2rem 1rem;
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 500;
}

.btn-edit-user {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-delete-user {
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 1px solid var(--border-color);
}
</style>
