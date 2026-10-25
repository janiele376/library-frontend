import { onBeforeUnmount, ref, watch } from 'vue';
import axios from 'axios';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';

import { getUsers, deleteUser } from '@/services/userService';
import type { UserResponse } from '@/types/user';

export function useUsers() {
  const $q = useQuasar();
  const { t } = useI18n({ useScope: 'global' });

  const users = ref<UserResponse[]>([]);
  const search = ref<string | null>('');
  const currentPage = ref(1);
  const totalPages = ref(1);

  const loading = ref(false);
  const deleting = ref(false);

  const pageSize = 5;

  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let requestSequence = 0;

  async function loadUsers(): Promise<void> {
    const requestId = ++requestSequence;

    loading.value = true;

    try {
      const searchTerm = search.value?.trim() ?? '';

      const response = await getUsers({
        ...(searchTerm ? { nameCompleted: searchTerm } : {}),
        page: currentPage.value - 1,
        size: pageSize,
      });

      if (requestId !== requestSequence) return;

      totalPages.value = Math.max(response.totalPages, 1);

      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
        return;
      }

      users.value = response.content;
    } catch {
      if (requestId !== requestSequence) return;

      users.value = [];
      totalPages.value = 1;

      $q.notify({
        type: 'negative',
        message: t('users.messages.loadError'),
      });
    } finally {
      if (requestId === requestSequence) {
        loading.value = false;
      }
    }
  }

  async function removeUser(id: number): Promise<void> {
    if (deleting.value) return;

    deleting.value = true;

    try {
      await deleteUser(id);

      $q.notify({
        type: 'positive',
        message: t('users.messages.deleteSuccess'),
      });

      await loadUsers();
    } catch (error: unknown) {
      let message = t('users.messages.deleteError');

      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 403:
            message = t('users.messages.deleteForbidden');
            break;

          case 404:
            message = t('users.messages.notFound');
            break;

          case 409:
            message = t('users.messages.deleteConflict');
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

  function confirmDeleteUser(user: UserResponse): void {
    if (deleting.value) return;

    $q.dialog({
      title: t('users.deleteDialog.title'),
      message: t('users.deleteDialog.message', {
        name: user.nameCompleted,
      }),
      cancel: {
        label: t('users.deleteDialog.cancel'),
        flat: true,
        noCaps: true,
      },
      ok: {
        label: t('users.deleteDialog.confirm'),
        color: 'negative',
        unelevated: true,
        noCaps: true,
      },
      persistent: true,
    }).onOk(() => {
      void removeUser(user.id);
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
      void loadUsers();
    }, 400);
  });

  watch(currentPage, () => {
    if (searchTimeout !== null) return;

    void loadUsers();
  });

  onBeforeUnmount(() => {
    ++requestSequence;

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }
  });

  return {
    users,
    search,
    currentPage,
    totalPages,
    loading,
    deleting,
    loadUsers,
    confirmDeleteUser,
  };
}
