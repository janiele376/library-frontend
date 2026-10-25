<template>
  <main class="books-page">
    <DashboardSidebar />

    <section class="container-books">
      <div class="container-create-book">
        <h2>{{ t('books.page.title') }}</h2>

        <button type="button" class="btn-create-book" @click="openCreateModal">
          {{ t('books.page.newBook') }}
        </button>
      </div>

      <div class="container-list">
        <SearchInput v-model="search" />

        <hr class="line-search" />

        <DataTable grid-columns="0.5fr 0.9fr 2fr 1.6fr 1.4fr 0.8fr 1.6fr">
          <template #header>
            <h3>{{ t('books.page.id') }}</h3>
            <h3>{{ t('books.page.code') }}</h3>
            <h3>{{ t('books.page.bookName') }}</h3>
            <h3>{{ t('books.page.publisher') }}</h3>
            <h3>{{ t('books.page.releaseDate') }}</h3>
            <h3>{{ t('books.page.quantity') }}</h3>
            <h3 class="action">{{ t('books.page.actions') }}</h3>
          </template>

          <BookTableRow
            v-for="book in books"
            :key="book.id"
            :id="book.id"
            :code="book.isbn"
            :name="book.title"
            :publisher="book.publisherName"
            :release-date="formatDateToBR(book.releaseDate)"
            :quantity="book.quantity"
            @edit="openEditModal(book)"
            @delete="confirmDeleteBook(book)"
          />
        </DataTable>

        <div v-if="loading" class="text-center q-pa-md">
          {{ t('books.page.loading') }}
        </div>

        <div v-else-if="books.length === 0" class="text-center q-pa-md">
          {{ t('books.page.empty') }}
        </div>

        <PaginationControls v-model:currentPage="currentPage" :total-pages="totalPages" />
      </div>
    </section>

    <BookFormModal
      ref="bookFormModal"
      :publishers="publishers"
      :saving="saving"
      @create="handleCreateBook"
      @update="handleUpdateBook"
    />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';
import SearchInput from '@/components/others/SearchInput.vue';
import DataTable from '@/components/others/DataTable.vue';
import PaginationControls from '@/components/others/PaginationControls.vue';
import BookTableRow from '@/components/books/BookTableRow.vue';
import BookFormModal from '@/components/books/BookFormModal.vue';

import { useBooks } from '@/composables/books/useBooks';
import { formatDateToBR } from '@/utils/dateUtils';

import type { BookResponse } from '@/types/books';

const { t } = useI18n({ useScope: 'global' });

const bookFormModal = ref<InstanceType<typeof BookFormModal> | null>(null);

const {
  books,
  publishers,
  search,
  currentPage,
  totalPages,
  loading,
  saving,
  loadBooks,
  loadPublishers,
  confirmDeleteBook,
  handleCreateBook,
  handleUpdateBook,
} = useBooks({
  onSaved: () => {
    bookFormModal.value?.closeAfterSave();
  },
});

function openCreateModal(): void {
  bookFormModal.value?.openCreateModal();
}

function openEditModal(book: BookResponse): void {
  bookFormModal.value?.openEditModal(book);
}

onMounted(() => {
  void loadBooks();
  void loadPublishers();
});
</script>

<style scoped>
.books-page {
  width: 100%;
  min-height: calc(100vh - 7rem);
  display: flex;
  background-color: var(--bg-page, #e9e4de);
}

.container-books {
  flex: 1;
  min-width: 0;
  margin: 1.5rem 5%;
  padding: 1rem 1.5rem;
  background-color: var(--bg-card, #dbc2b0);
  color: var(--text-main, #55463c);
  border: 1px solid var(--border-color, transparent);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.container-create-book {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
}

.container-create-book h2 {
  font-size: 1.4rem;
  margin: 0;
}

.btn-create-book {
  width: 10rem;
  min-height: 2.2rem;
  padding: 0.3rem 0.7rem;
  border: 0.0625rem solid var(--btn-primary-border, #55463c);
  border-radius: 1rem;
  background-color: var(--btn-primary-bg, #55463c);
  color: var(--btn-primary-text, white);
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-create-book:hover {
  opacity: 0.7;
}

.container-list {
  flex: 1;
  min-height: 30rem;
  width: 100%;
  border: 0.1rem solid var(--border-color, #55463c);
  border-radius: 1rem;
  padding: 0.8rem 1rem;
  display: flex;
  flex-direction: column;
  overflow-x: auto;
}

.line-search {
  margin-top: 0.3rem;
  margin-bottom: 0;
  border: 0;
  border-top: 1px solid var(--border-color, #55463c);
}

.action {
  text-align: center;
}
</style>
