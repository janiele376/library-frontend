import { onBeforeUnmount, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import { getRentals } from '@/services/rentalService';
import { getUserById, getUsers } from '@/services/userService';
import { getBookById, getBooks } from '@/services/bookService';

import { mapRentalStatus } from '@/types/rentals';

import type { RentalData, RentalResponse } from '@/types/rentals';

export function useRentals() {
  const { t } = useI18n({ useScope: 'global' });
  const $q = useQuasar();

  const rentals = ref<RentalData[]>([]);

  const searchTerm = ref<string | null>('');

  const currentPage = ref(1);
  const totalPages = ref(1);

  const users = ref<{ id: number; name: string; cpf: string }[]>([]);
  const books = ref<{ id: number; name: string; code: string }[]>([]);

  const loading = ref(false);

  const pageSize = 5;

  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let requestVersion = 0;
  let optionsRequestVersion = 0;

  async function loadRentals(): Promise<void> {
    const version = ++requestVersion;

    loading.value = true;

    try {
      const search = (searchTerm.value ?? '').trim();

      const response = await getRentals(
        currentPage.value - 1,
        pageSize,
        search || undefined,
        undefined,
      );

      const mapped = await Promise.all(
        response.content.map(async (rental: RentalResponse) => {
          const [user, book] = await Promise.all([
            getUserById(rental.usersId),
            getBookById(rental.booksId),
          ]);

          return {
            id: String(rental.id),
            userName: user.nameCompleted,
            cpf: user.cpf,
            bookName: book.title,
            bookCode: String(book.id),
            startDate: rental.startDate,
            endDate: rental.endDate,
            status: mapRentalStatus(rental.status),
          } satisfies RentalData;
        }),
      );

      if (version !== requestVersion) return;

      totalPages.value = Math.max(1, response.totalPages);

      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
        return;
      }

      rentals.value = mapped;
    } catch (error: unknown) {
      if (version !== requestVersion) return;

      console.error('Erro ao carregar empréstimos:', error);

      rentals.value = [];
      totalPages.value = 1;

      $q.notify({
        type: 'negative',
        message: t('rentals.messages.loadError'),
      });
    } finally {
      if (version === requestVersion) {
        loading.value = false;
      }
    }
  }

  async function loadOptions(): Promise<void> {
    const version = ++optionsRequestVersion;

    try {
      const [usersResponse, booksResponse] = await Promise.all([
        getUsers({ page: 0, size: 100 }),
        getBooks({ page: 0, size: 100 }),
      ]);

      if (version !== optionsRequestVersion) return;

      users.value = usersResponse.content.map((user) => ({
        id: user.id,
        name: user.nameCompleted,
        cpf: user.cpf,
      }));

      books.value = booksResponse.content.map((book) => ({
        id: book.id,
        name: book.title,
        code: String(book.id),
      }));
    } catch (error: unknown) {
      if (version !== optionsRequestVersion) return;

      console.error('Erro ao carregar usuários e livros:', error);

      $q.notify({
        type: 'negative',
        message: t('rentals.messages.loadOptionsError'),
      });
    }
  }

  watch(searchTerm, () => {
    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }

    ++requestVersion;
    loading.value = true;
    currentPage.value = 1;

    searchTimeout = setTimeout(() => {
      searchTimeout = null;
      void loadRentals();
    }, 400);
  });

  watch(currentPage, () => {
    if (searchTimeout !== null) return;

    void loadRentals();
  });

  onBeforeUnmount(() => {
    ++requestVersion;
    ++optionsRequestVersion;

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }
  });

  return {
    rentals,
    searchTerm,
    currentPage,
    totalPages,
    users,
    books,
    loading,
    loadRentals,
    loadOptions,
  };
}
