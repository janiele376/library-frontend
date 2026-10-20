<template>
  <div class="most-rented-content">
    <div class="book-info-text">
      <p>
        <strong>Título do Livro:</strong>
        <span>{{ title }}</span>
      </p>

      <p>
        <strong>Editora:</strong>
        <span>{{ publisher }}</span>
      </p>

      <p>
        <strong>Data de Lançamento:</strong>
        <span>{{ releaseDate }}</span>
      </p>

      <p>
        <strong>Quantidade:</strong>
        <span>{{ quantity }}</span>
      </p>
    </div>

    <div v-if="cover && !imageError" class="book-cover">
      <img :src="cover" alt="Capa do livro" @error="imageError = true" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = withDefaults(
  defineProps<{
    title?: string;
    publisher?: string;
    releaseDate?: string;
    quantity?: number;
    cover?: string;
  }>(),
  {
    title: '-',
    publisher: '-',
    releaseDate: '-',
    quantity: 0,
    cover: '',
  },
);

const imageError = ref(false);

watch(
  () => props.cover,
  () => {
    imageError.value = false;
  },
);
</script>

<style scoped>
.most-rented-content {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.book-info-text {
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.book-info-text p {
  overflow-wrap: anywhere;
}

.book-info-text span {
  margin-left: 0.3rem;
}

.book-cover {
  flex-shrink: 0;
}

.book-cover img {
  width: 4.8rem;
  height: 6.8rem;
  object-fit: cover;
  border-radius: 0.4rem;
  border: 0.08rem solid var(--border-color);
  background-color: var(--bg-input);
}
</style>
