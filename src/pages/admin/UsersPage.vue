<template>
  <div class="users-page">
    <DashboardSidebar />

    <section class="container-users">
      <div class="container-list">
        <SearchInput v-model="search" :placeholder="t('users.list.searchPlaceholder')" />

        <hr class="line-search" />

        <div v-if="loading" class="table-loading">
          <q-spinner color="primary" size="2.5rem" />
        </div>

        <template v-else>
          <DataTable grid-columns="0.5fr 1.5fr 1.2fr 1.2fr 1.8fr 1.5fr">
            <template #header>
              <h3>{{ t('users.list.id') }}</h3>
              <h3>{{ t('users.list.name') }}</h3>
              <h3>{{ t('users.list.cpf') }}</h3>
              <h3>{{ t('users.list.birthDate') }}</h3>
              <h3>{{ t('users.list.address') }}</h3>
              <h3>{{ t('users.list.actions') }}</h3>
            </template>

            <UserTableRow
              v-for="user in users"
              :key="user.id"
              :user="user"
              @edit="openEditModal"
              @delete="confirmDeleteUser"
            />
          </DataTable>

          <div v-if="users.length === 0" class="empty-users">
            {{ t('users.list.empty') }}
          </div>
        </template>

        <PaginationControls v-model:current-page="currentPage" :total-pages="totalPages" />
      </div>
    </section>

    <EditUserModal ref="editUserModal" @updated="loadUsers" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import DashboardSidebar from '@/components/dashboard/DashboardSidebar.vue';
import SearchInput from '@/components/others/SearchInput.vue';
import DataTable from '@/components/others/DataTable.vue';
import PaginationControls from '@/components/others/PaginationControls.vue';
import UserTableRow from '@/components/users/UserTableRow.vue';
import EditUserModal from '@/components/users/EditUserModal.vue';

import { useUsers } from '@/composables/useUsers';

const { t } = useI18n({ useScope: 'global' });

const editUserModal = ref<InstanceType<typeof EditUserModal> | null>(null);

const { users, search, currentPage, totalPages, loading, loadUsers, confirmDeleteUser } =
  useUsers();

function openEditModal(id: number): void {
  void editUserModal.value?.openModal(id);
}

onMounted(() => {
  void loadUsers();
});
</script>

<style scoped>
.users-page {
  width: 100%;
  min-height: calc(100vh - 7rem);
  display: flex;
  background-color: var(--bg-page, #e9e4de);
}

.container-users {
  flex: 1;
  min-width: 0;
  margin: 2.5rem 5%;
  padding: 1.5rem;
  background-color: var(--bg-card, #dbc2b0);
  color: var(--text-main, #55463c);
  border: 1px solid var(--border-color, transparent);
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
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
  margin-top: 0.8rem;
  margin-bottom: 0.2rem;
  border: 0;
  border-top: 1px solid var(--border-color, #55463c);
}

.table-loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 15rem;
}

.empty-users {
  padding: 2rem 1rem;
  text-align: center;
  color: var(--text-main);
}
</style>
