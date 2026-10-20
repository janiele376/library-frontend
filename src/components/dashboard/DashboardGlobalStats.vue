<template>
  <div class="table-globals">
    <div class="row-global">
      <span>Aluguéis Realizados</span>
      <span>{{ rentals }}</span>
    </div>

    <hr />

    <div class="row-global">
      <span>Livros Cadastrados</span>
      <span>{{ books }}</span>
    </div>

    <hr />

    <div class="row-global">
      <span>Editoras Cadastradas</span>
      <span>{{ publishers }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    rentals?: number;
    books?: number;
    publishers?: number;
  }>(),
  {
    rentals: 0,
    books: 0,
    publishers: 0,
  },
);
</script>

<style scoped>
.table-globals {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.row-global {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  font-weight: 500;
}

.row-global span:last-child {
  font-weight: bold;
}

.table-globals hr {
  border: 0;
  border-top: 0.05rem solid var(--border-color);
}
</style>
