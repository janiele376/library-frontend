<template>
  <div class="btn-next-page">
    <q-btn
      type="button"
      class="btn-prev"
      icon="chevron_left"
      flat
      dense
      unelevated
      :disable="currentPage <= 1"
      :aria-label="t('components.pagination.previousPage')"
      @click="previousPage"
    />

    <p>
      {{
        t('components.pagination.pageIndicator', {
          current: currentPage,
          total: totalPages,
        })
      }}
    </p>

    <q-btn
      type="button"
      class="btn-next"
      icon="chevron_right"
      flat
      dense
      unelevated
      :disable="currentPage >= totalPages"
      :aria-label="t('components.pagination.nextPage')"
      @click="nextPage"
    />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  currentPage?: number;
  totalPages?: number;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  totalPages: 1,
});

const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

const { t } = useI18n();

function previousPage() {
  if (props.currentPage <= 1) return;

  emit('update:currentPage', props.currentPage - 1);
}

function nextPage() {
  if (props.currentPage >= props.totalPages) return;

  emit('update:currentPage', props.currentPage + 1);
}
</script>

<style scoped>
.btn-next-page {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: auto;
  padding-top: 1rem;
  padding-bottom: 0.5rem;
}

.btn-next-page .q-btn {
  width: 1.8rem;
  min-width: 1.8rem;
  height: 1.8rem;
  min-height: 1.8rem;
  padding: 0;
  border: 0.1rem solid var(--border-color);
  border-radius: 0.4rem;
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-next-page .q-btn :deep(.q-icon) {
  font-size: 1.5rem;
}

.btn-next-page .q-btn:hover {
  opacity: 0.7;
}

.btn-next-page .q-btn.q-btn--disabled {
  opacity: 0.5 !important;
  cursor: not-allowed;
}

.btn-next-page p {
  margin: 0;
  color: var(--text-main);
  font-size: 0.9rem;
}
</style>
