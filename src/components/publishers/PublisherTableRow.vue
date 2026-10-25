<template>
  <div class="publisher-table-row">
    <p>{{ publisher.id }}</p>

    <p>{{ publisher.name }}</p>

    <div class="contact-info">
      <span>{{ publisher.email }}</span>
      <span>{{ publisher.phone }}</span>
    </div>

    <p>{{ publisher.address }}</p>

    <div class="container-btns">
      <q-btn
        type="button"
        class="btn-edit"
        :label="t('publishers.row.editButton')"
        no-caps
        unelevated
        @click="emit('edit')"
      />

      <q-btn
        type="button"
        class="btn-delete"
        :label="t('publishers.row.deleteButton')"
        no-caps
        unelevated
        @click="emit('delete')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { PublisherResponse } from '@/types/publishers';

defineProps<{
  publisher: PublisherResponse;
}>();

const emit = defineEmits<{
  edit: [];
  delete: [];
}>();

const { t } = useI18n();
</script>

<style scoped>
.publisher-table-row {
  width: 100%;
  min-height: 2.5rem;
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 2fr 1.6fr;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.8rem;
  background-color: var(--bg-page);
  color: var(--text-main);
  border-radius: 0.3rem;
  font-size: 0.9rem;
}

.publisher-table-row p {
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.contact-info {
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.contact-info span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
