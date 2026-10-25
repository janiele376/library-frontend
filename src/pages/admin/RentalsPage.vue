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
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';
import SearchInput from '@/components/others/SearchInput.vue';
import DataTable from '@/components/others/DataTable.vue';
import PaginationControls from '@/components/others/PaginationControls.vue';
import RentalTableRow from '@/components/rentals/RentalTableRow.vue';
import RentalFormModal from '@/components/rentals/RentalFormModal.vue';

import { useRentals } from '@/composables/rentals/useRentals';

import type { RentalData } from '@/types/rentals';

const { t } = useI18n({ useScope: 'global' });

const rentalFormModal = ref<InstanceType<typeof RentalFormModal> | null>(null);

const { rentals, searchTerm, currentPage, totalPages, users, books, loadRentals, loadOptions } =
  useRentals();

function openCreateModal(): void {
  rentalFormModal.value?.openCreateModal();
}

function openRenewModal(rental: RentalData): void {
  rentalFormModal.value?.openRenewModal(rental);
}

function openReturnModal(rental: RentalData): void {
  rentalFormModal.value?.openReturnModal(rental);
}

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
