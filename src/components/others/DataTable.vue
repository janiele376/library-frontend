<template>
  <div class="data-table">
    <div class="container-table-info" :style="{ gridTemplateColumns: gridColumns }">
      <slot name="header" />
    </div>

    <q-separator class="line-header-divider" />

    <div class="table-content">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    gridColumns?: string;
  }>(),
  {
    gridColumns: 'repeat(5, minmax(0, 1fr))',
  },
);
</script>

<style scoped>
.data-table {
  width: 100%;
  min-width: 45rem;
  margin: 0;
  padding: 0;
}

.container-table-info {
  width: 100%;
  display: grid;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0.8rem;
  margin: 0;
  color: var(--text-main);
}

.container-table-info :slotted(h3) {
  font-size: 1rem;
  color: var(--text-main);
  margin: 0;
}

.line-header-divider {
  margin: 0.3rem 0 0.2rem;
  background-color: var(--border-color);
  height: 1px;
}

.table-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}
</style>
