import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import { createRental, renewRental, returnRental } from '@/services/rentalService';
import { getTodayISO, addDaysToISO } from '@/utils/dateUtils';

import type { RentalData } from '@/types/rentals';

type ModalMode = 'create' | 'renew' | 'return';

interface UseRentalFormOptions {
  onSaved?: () => void;
}

export function useRentalForm(options: UseRentalFormOptions = {}) {
  const { t } = useI18n({ useScope: 'global' });
  const $q = useQuasar();

  const isOpen = ref(false);
  const saving = ref(false);
  const mode = ref<ModalMode>('create');
  const selectedRental = ref<RentalData | null>(null);

  const form = ref({
    usersId: null as number | null,
    booksId: null as number | null,
  });

  const modalTitle = computed(() => {
    if (mode.value === 'renew') {
      return t('rentals.renew.title');
    }

    if (mode.value === 'return') {
      return t('rentals.return.title');
    }

    return t('rentals.form.createTitle');
  });

  const displayDate = computed(() => {
    if (!selectedRental.value) return '';

    if (mode.value === 'renew') {
      return addDaysToISO(selectedRental.value.endDate, 14);
    }

    return getTodayISO();
  });

  function openCreateModal(): void {
    mode.value = 'create';
    selectedRental.value = null;

    form.value = {
      usersId: null,
      booksId: null,
    };

    isOpen.value = true;
  }

  function openRenewModal(rental: RentalData): void {
    mode.value = 'renew';
    selectedRental.value = rental;
    isOpen.value = true;
  }

  function openReturnModal(rental: RentalData): void {
    mode.value = 'return';
    selectedRental.value = rental;
    isOpen.value = true;
  }

  function closeModal(): void {
    if (saving.value) return;

    isOpen.value = false;
  }

  async function confirmAction(): Promise<void> {
    if (saving.value) return;

    if (mode.value === 'create') {
      const { usersId, booksId } = form.value;

      if (
        usersId === null ||
        booksId === null ||
        !Number.isSafeInteger(usersId) ||
        !Number.isSafeInteger(booksId) ||
        usersId <= 0 ||
        booksId <= 0
      ) {
        $q.notify({
          type: 'negative',
          message: t('rentals.messages.invalidIds'),
        });

        return;
      }
    }

    saving.value = true;

    try {
      if (mode.value === 'create') {
        await createRental({
          usersId: Number(form.value.usersId),
          booksId: Number(form.value.booksId),
        });
      } else {
        const rental = selectedRental.value;

        if (!rental) return;

        const rentalId = Number(rental.id);

        if (!Number.isSafeInteger(rentalId) || rentalId <= 0) {
          throw new Error(t('rentals.messages.invalidRentalId'));
        }

        if (mode.value === 'renew') {
          await renewRental(rentalId);
        } else {
          await returnRental(rentalId);
        }
      }

      $q.notify({
        type: 'positive',
        message: t('rentals.messages.operationSuccess'),
      });

      isOpen.value = false;
      options.onSaved?.();
    } catch (error: unknown) {
      console.error('Erro na operação de empréstimo:', error);

      $q.notify({
        type: 'negative',
        message: t('rentals.messages.operationError'),
      });
    } finally {
      saving.value = false;
    }
  }

  return {
    isOpen,
    saving,
    mode,
    selectedRental,
    form,
    modalTitle,
    displayDate,
    openCreateModal,
    openRenewModal,
    openReturnModal,
    closeModal,
    confirmAction,
  };
}
