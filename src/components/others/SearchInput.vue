<template>
  <div class="container-search">
    <q-input
      v-model="model"
      type="text"
      class="input-search"
      :placeholder="placeholder ?? t('components.searchInput.placeholder')"
      borderless
      dense
      hide-bottom-space
      clearable
      clear-icon="close"
    />

    <q-icon name="search" class="icon-search" size="1.5rem" aria-hidden="true" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface Props {
  placeholder?: string;
}

defineProps<Props>();

const model = defineModel<string | null>({
  default: '',
});

const { t } = useI18n();
</script>

<style scoped>
.container-search {
  width: 100%;
  min-height: 2.2rem;
  display: flex;
  align-items: center;
  gap: 0.7rem;
  padding: 0 1rem;
  border-radius: 4rem;
  border: 1px solid var(--border-color);
  background-color: var(--bg-input);
}

.input-search {
  flex: 1;
  min-width: 0;
  background-color: transparent;
  color: var(--text-main);
  font-size: 0.95rem;
}

.input-search :deep(.q-field__control) {
  min-height: 2.2rem;
  height: 2.2rem;
  padding: 0;
  background-color: transparent;
}

.input-search :deep(.q-field__native) {
  min-height: 2.2rem;
  padding: 0;
  color: var(--text-main);
  font-size: 0.95rem;
}

.input-search :deep(.q-field__native::placeholder) {
  color: var(--text-main);
  opacity: 0.7;
}

.input-search :deep(.q-field__append) {
  height: 2.2rem;
  color: var(--text-main);
}

.icon-search {
  color: var(--text-main);
  flex-shrink: 0;
  transition: opacity 0.2s;
}
</style>
