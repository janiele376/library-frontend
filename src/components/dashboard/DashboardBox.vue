<template>
  <section class="dashboard-box">
    <div class="box-header">
      {{ title }}
    </div>

    <div class="box-content">
      <slot />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<style scoped>
.dashboard-box {
  min-height: 13rem;
  background-color: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.box-header {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  padding: 0.7rem 1rem;
  font-size: 0.95rem;
  font-weight: bold;
}

.box-content {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: var(--text-main);
  font-size: 0.85rem;
}
</style>
