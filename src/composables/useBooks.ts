import { onBeforeUnmount, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import { getBooks, createBook, updateBook, deleteBook } from '@/services/bookService';

import type { BookResponse, CreateBookRequest, UpdateBookRequest } from '@/types/books';

interface UseBooksOptions {
  onSaved?: () => void;
}

export function useBooks(options: UseBooksOptions = {}) {
  const $q = useQuasar();
  const { t } = useI18n({ useScope: 'global' });

  const books = ref<BookResponse[]>([]);
  const search = ref<string | null>('');
  const currentPage = ref(1);
  const totalPages = ref(1);

  const loading = ref(false);
  const saving = ref(false);
  const deleting = ref(false);

  const pageSize = 5;

  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let requestSequence = 0;

  async function loadBooks(): Promise<void> {
    const requestId = ++requestSequence;

    loading.value = true;

    try {
      const searchTerm = search.value?.trim() ?? '';

      const response = await getBooks({
        ...(searchTerm ? { title: searchTerm } : {}),
        page: currentPage.value - 1,
        size: pageSize,
      });

      if (requestId !== requestSequence) return;

      totalPages.value = Math.max(response.totalPages, 1);

      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
        return;
      }

      books.value = response.content;
    } catch {
      if (requestId !== requestSequence) return;

      books.value = [];
      totalPages.value = 1;

      $q.notify({
        type: 'negative',
        message: t('books.messages.loadError'),
      });
    } finally {
      if (requestId === requestSequence) {
        loading.value = false;
      }
    }
  }

  function getSaveErrorMessage(error: unknown): string {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          return t('books.messages.invalidData');

        case 403:
          return t('books.messages.saveForbidden');

        case 404:
          return t('books.messages.bookOrPublisherNotFound');

        case 409:
          return t('books.messages.saveConflict');
      }
    }

    return t('books.messages.saveError');
  }

  async function handleCreateBook(data: CreateBookRequest): Promise<void> {
    if (saving.value) return;

    saving.value = true;

    try {
      await createBook(data);

      options.onSaved?.();

      if (currentPage.value !== 1) {
        currentPage.value = 1;
      } else {
        await loadBooks();
      }

      $q.notify({
        type: 'positive',
        message: t('books.messages.createSuccess'),
      });
    } catch (error: unknown) {
      $q.notify({
        type: 'negative',
        message: getSaveErrorMessage(error),
      });
    } finally {
      saving.value = false;
    }
  }

  async function handleUpdateBook(id: number, data: UpdateBookRequest): Promise<void> {
    if (saving.value) return;

    saving.value = true;

    try {
      await updateBook(id, data);

      options.onSaved?.();

      await loadBooks();

      $q.notify({
        type: 'positive',
        message: t('books.messages.updateSuccess'),
      });
    } catch (error: unknown) {
      $q.notify({
        type: 'negative',
        message: getSaveErrorMessage(error),
      });
    } finally {
      saving.value = false;
    }
  }

  async function removeBook(id: number): Promise<void> {
    if (deleting.value) return;

    deleting.value = true;

    try {
      await deleteBook(id);

      $q.notify({
        type: 'positive',
        message: t('books.messages.deleteSuccess'),
      });

      await loadBooks();
    } catch (error: unknown) {
      let message = t('books.messages.deleteError');

      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 403:
            message = t('books.messages.deleteForbidden');
            break;

          case 404:
            message = t('books.messages.notFound');
            break;

          case 409:
            message = t('books.messages.deleteConflict');
            break;
        }
      }

      $q.notify({
        type: 'negative',
        message,
      });
    } finally {
      deleting.value = false;
    }
  }

  function confirmDeleteBook(book: BookResponse): void {
    if (deleting.value) return;

    $q.dialog({
      title: t('books.deleteDialog.title'),
      message: t('books.deleteDialog.message', {
        title: book.title,
      }),
      cancel: {
        label: t('books.deleteDialog.cancel'),
        flat: true,
        noCaps: true,
      },
      ok: {
        label: t('books.deleteDialog.confirm'),
        color: 'negative',
        unelevated: true,
        noCaps: true,
      },
      persistent: true,
    }).onOk(() => {
      void removeBook(book.id);
    });
  }

  watch(search, () => {
    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }

    ++requestSequence;
    loading.value = true;
    currentPage.value = 1;

    searchTimeout = setTimeout(() => {
      searchTimeout = null;
      void loadBooks();
    }, 400);
  });

  watch(currentPage, () => {
    if (searchTimeout !== null) return;

    void loadBooks();
  });

  onBeforeUnmount(() => {
    ++requestSequence;

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }
  });

  return {
    books,
    search,
    currentPage,
    totalPages,
    loading,
    saving,
    deleting,
    loadBooks,
    handleCreateBook,
    handleUpdateBook,
    confirmDeleteBook,
  };
}
