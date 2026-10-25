<template>
  <main class="publishers-page">
    <DashboardSidebar />

    <section class="container-publishers">
      <div class="container-create-publisher">
        <h2>{{ t('publishers.title') }}</h2>

        <button type="button" class="btn-create-publisher" @click="openCreateModal">
          {{ t('publishers.newPublisher') }}
        </button>
      </div>

      <div class="container-list">
        <SearchInput v-model="searchTerm" />

        <hr class="line-search" />

        <DataTable grid-columns="0.6fr 1.8fr 2.2fr 2fr 1.6fr">
          <template #header>
            <h3>{{ t('publishers.table.id') }}</h3>
            <h3>{{ t('publishers.table.name') }}</h3>
            <h3>{{ t('publishers.table.contact') }}</h3>
            <h3>{{ t('publishers.table.address') }}</h3>
            <h3 class="action">
              {{ t('publishers.table.actions') }}
            </h3>
          </template>

          <PublisherTableRow
            v-for="publisher in publishers"
            :key="publisher.id"
            :publisher="publisher"
            @edit="openEditModal(publisher)"
            @delete="confirmDeletePublisher(publisher)"
          />
        </DataTable>

        <div v-if="loading" class="text-center q-pa-md">
          {{ t('publishers.loading') }}
        </div>

        <div v-else-if="publishers.length === 0" class="text-center q-pa-md">
          {{ t('publishers.empty') }}
        </div>

        <PaginationControls v-model:current-page="currentPage" :total-pages="totalPages" />
      </div>
    </section>

    <PublisherFormModal ref="publisherFormModal" @saved="loadPublishers" />
  </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';
import SearchInput from '@/components/others/SearchInput.vue';
import DataTable from '@/components/others/DataTable.vue';
import PaginationControls from '@/components/others/PaginationControls.vue';
import PublisherTableRow from '@/components/publishers/PublisherTableRow.vue';
import PublisherFormModal from '@/components/publishers/PublisherFormModal.vue';

import { usePublishers } from '@/composables/publishers/usePublishers';

import type { PublisherResponse } from '@/types/publishers';

const { t } = useI18n({ useScope: 'global' });

const publisherFormModal = ref<InstanceType<typeof PublisherFormModal> | null>(null);

const {
  publishers,
  searchTerm,
  currentPage,
  totalPages,
  loading,
  loadPublishers,
  confirmDeletePublisher,
} = usePublishers();

function openCreateModal(): void {
  publisherFormModal.value?.openCreateModal();
}

function openEditModal(publisher: PublisherResponse): void {
  publisherFormModal.value?.openEditModal(publisher);
}

onMounted(() => {
  void loadPublishers();
});
</script>

<style scoped>
.publishers-page {
  width: 100%;
  min-height: calc(100vh - 7rem);
  display: flex;
  background-color: var(--bg-page);
}

.container-publishers {
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

.container-create-publisher {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
}

.container-create-publisher h2 {
  font-size: 1.4rem;
  margin: 0;
}

.btn-create-publisher {
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

.btn-create-publisher:hover {
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
