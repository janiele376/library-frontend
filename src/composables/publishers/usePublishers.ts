import { onBeforeUnmount, ref, watch } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import { getPublishers, deletePublisher } from '@/services/publisherService';

import type { PublisherResponse } from '@/types/publishers';

export function usePublishers() {
  const { t } = useI18n({ useScope: 'global' });
  const $q = useQuasar();

  const publishers = ref<PublisherResponse[]>([]);
  const searchTerm = ref('');
  const currentPage = ref(1);
  const totalPages = ref(1);

  const loading = ref(false);
  const deleting = ref(false);

  const pageSize = 5;

  let searchTimeout: ReturnType<typeof setTimeout> | null = null;
  let requestSequence = 0;

  async function loadPublishers(): Promise<void> {
    const requestId = ++requestSequence;

    loading.value = true;

    try {
      const response = await getPublishers(
        currentPage.value - 1,
        pageSize,
        searchTerm.value.trim(),
      );

      if (requestId !== requestSequence) return;

      totalPages.value = Math.max(response.totalPages, 1);

      if (currentPage.value > totalPages.value) {
        currentPage.value = totalPages.value;
        return;
      }

      publishers.value = response.content;
    } catch {
      if (requestId !== requestSequence) return;

      publishers.value = [];
      totalPages.value = 1;

      $q.notify({
        type: 'negative',
        message: t('publishers.messages.loadError'),
      });
    } finally {
      if (requestId === requestSequence) {
        loading.value = false;
      }
    }
  }

  async function removePublisher(id: number): Promise<void> {
    if (deleting.value) return;

    deleting.value = true;

    try {
      await deletePublisher(id);

      $q.notify({
        type: 'positive',
        message: t('publishers.messages.deleteSuccess'),
      });

      await loadPublishers();
    } catch (error: unknown) {
      const message =
        axios.isAxiosError(error) && error.response?.status === 409
          ? t('publishers.messages.deleteConflict')
          : t('publishers.messages.deleteError');

      $q.notify({
        type: 'negative',
        message,
      });
    } finally {
      deleting.value = false;
    }
  }

  function confirmDeletePublisher(publisher: PublisherResponse): void {
    if (deleting.value) return;

    $q.dialog({
      title: t('publishers.deleteDialog.title'),
      message: t('publishers.deleteDialog.message', {
        name: publisher.name,
      }),
      cancel: {
        label: t('publishers.deleteDialog.cancel'),
        flat: true,
        noCaps: true,
      },
      ok: {
        label: t('publishers.deleteDialog.confirm'),
        color: 'negative',
        unelevated: true,
        noCaps: true,
      },
      persistent: true,
    }).onOk(() => {
      void removePublisher(publisher.id);
    });
  }

  watch(searchTerm, () => {
    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }

    ++requestSequence;
    loading.value = true;
    currentPage.value = 1;

    searchTimeout = setTimeout(() => {
      searchTimeout = null;
      void loadPublishers();
    }, 400);
  });

  watch(currentPage, () => {
    if (searchTimeout !== null) return;

    void loadPublishers();
  });

  onBeforeUnmount(() => {
    ++requestSequence;

    if (searchTimeout !== null) {
      clearTimeout(searchTimeout);
      searchTimeout = null;
    }
  });

  return {
    publishers,
    searchTerm,
    currentPage,
    totalPages,
    loading,
    deleting,
    loadPublishers,
    confirmDeletePublisher,
  };
}
