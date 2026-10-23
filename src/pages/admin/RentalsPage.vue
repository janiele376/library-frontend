<template>
  <main class="rentals-page">
    <DashboardSidebar />

    <section class="container-rentals">
      <div class="container-create-rental">
        <h2>{{ t('rentals.title') }}</h2>

        <button type="button" class="btn-create-rental" @click="openCreateModal">
          {{ t('rentals.newRental') }}
        </button>
      </div>

      <div class="container-list">
        <SearchInput v-model="searchTerm" :placeholder="t('rentals.searchPlaceholder')" />

        <hr class="line-search" />

        <DataTable grid-columns="1.7fr 1.8fr 1fr 1fr 1fr 2fr">
          <template #header>
            <h3>{{ t('rentals.table.userName') }}</h3>
            <h3>{{ t('rentals.table.book') }}</h3>
            <h3>{{ t('rentals.table.startDate') }}</h3>
            <h3>{{ t('rentals.table.endDate') }}</h3>
            <h3>{{ t('rentals.table.status') }}</h3>
            <h3 class="action">{{ t('rentals.table.actions') }}</h3>
          </template>

          <RentalTableRow
            v-for="rental in rentals"
            :key="rental.id"
            :rental="rental"
            @renew="openRenewModal(rental)"
            @return="openReturnModal(rental)"
          />
        </DataTable>

        <PaginationControls v-model:current-page="currentPage" :total-pages="totalPages" />
      </div>
    </section>

    <RentalFormModal ref="rentalFormModal" :users="users" :books="books" @saved="loadRentals" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';
import SearchInput from '@/components/others/SearchInput.vue';
import DataTable from '@/components/others/DataTable.vue';
import PaginationControls from '@/components/others/PaginationControls.vue';
import RentalTableRow from '@/components/rentals/RentalTableRow.vue';
import RentalFormModal from '@/components/rentals/RentalFormModal.vue';

import { getRentals } from '@/services/rentalService';
import { getUserById, getUsers } from '@/services/userService';
import { getBookById, getBooks } from '@/services/bookService';

import { mapRentalStatus } from '@/types/rentals';
import type { RentalData, RentalResponse } from '@/types/rentals';

const { t } = useI18n();
const $q = useQuasar();

const rentalFormModal = ref<InstanceType<typeof RentalFormModal> | null>(null);

const rentals = ref<RentalData[]>([]);
const searchTerm = ref('');
const currentPage = ref(1);
const totalPages = ref(1);

const users = ref<{ id: number; name: string; cpf: string }[]>([]);

const books = ref<{ id: number; name: string; code: string }[]>([]);

let searchTimeout: ReturnType<typeof setTimeout> | undefined;
let requestVersion = 0;

async function loadRentals() {
  const version = ++requestVersion;

  try {
    const search = searchTerm.value.trim();

    const response = await getRentals(currentPage.value - 1, 5, search || undefined, undefined);

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

    rentals.value = mapped;
    totalPages.value = Math.max(1, response.totalPages);
  } catch (error) {
    if (version !== requestVersion) return;

    console.error('Erro ao carregar aluguéis:', error);

    $q.notify({
      type: 'negative',
      message: 'Não foi possível carregar os empréstimos.',
    });
  }
}

async function loadOptions() {
  try {
    const [usersResponse, booksResponse] = await Promise.all([
      getUsers({ page: 0, size: 100 }),
      getBooks({ page: 0, size: 100 }),
    ]);

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
  } catch (error) {
    console.error('Erro ao carregar usuários e livros:', error);

    $q.notify({
      type: 'negative',
      message: 'Não foi possível carregar usuários e livros.',
    });
  }
}

function openCreateModal() {
  rentalFormModal.value?.openCreateModal();
}

function openRenewModal(rental: RentalData) {
  rentalFormModal.value?.openRenewModal(rental);
}

function openReturnModal(rental: RentalData) {
  rentalFormModal.value?.openReturnModal(rental);
}

watch(currentPage, () => {
  void loadRentals();
});

watch(searchTerm, () => {
  currentPage.value = 1;

  if (searchTimeout) clearTimeout(searchTimeout);

  searchTimeout = setTimeout(() => {
    void loadRentals();
  }, 400);
});

onMounted(() => {
  void loadRentals();
  void loadOptions();
});
</script>

<style scoped>
.rentals-page {
  width: 100%;
  min-height: calc(100vh - 7rem);
  display: flex;
  background-color: var(--bg-page);
}

.container-rentals {
  flex: 1;
  min-width: 0;
  margin: 1.5rem 5%;
  padding: 1rem 1.5rem;
  background-color: var(--bg-card);
  color: var(--text-main);
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.container-create-rental {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
}

.container-create-rental h2 {
  font-size: 1.4rem;
  margin: 0;
}

.btn-create-rental {
  width: 10rem;
  min-height: 2.2rem;
  padding: 0.3rem 0.7rem;
  border: 0.0625rem solid var(--btn-primary-border);
  border-radius: 1rem;
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  font-size: 1rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-create-rental:hover {
  opacity: 0.7;
}

.container-list {
  flex: 1;
  min-height: 30rem;
  width: 100%;
  border: 0.1rem solid var(--border-color);
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
  border-top: 1px solid var(--border-color);
}

.action {
  text-align: center;
}
</style>
