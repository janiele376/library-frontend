import { reactive, ref } from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import type { PublisherFormData, PublisherResponse } from '@/types/publishers';

import { createPublisher, updatePublisher } from '@/services/publisherService';

import {
  validateName,
  validateCnpj,
  validateEmail,
  validatePhone,
  validateAddress,
} from '@/utils/publisherValidation';

export function usePublisherForm(onSaved: () => void) {
  const $q = useQuasar();
  const { t } = useI18n({ useScope: 'global' });

  const isOpen = ref(false);
  const isEditing = ref(false);
  const saving = ref(false);
  const originalId = ref<number | null>(null);

  const form = reactive<PublisherFormData>({
    id: '',
    name: '',
    cnpj: '',
    email: '',
    phone: '',
    address: '',
  });

  function resetForm(): void {
    Object.assign(form, {
      id: '',
      name: '',
      cnpj: '',
      email: '',
      phone: '',
      address: '',
    });

    originalId.value = null;
    isEditing.value = false;
  }

  function openCreateModal(): void {
    if (saving.value) return;

    resetForm();
    isOpen.value = true;
  }

  function openEditModal(publisher: PublisherResponse): void {
    if (saving.value) return;

    Object.assign(form, {
      id: String(publisher.id),
      name: publisher.name,
      cnpj: publisher.cnpj,
      email: publisher.email,
      phone: publisher.phone,
      address: publisher.address,
    });

    originalId.value = publisher.id;
    isEditing.value = true;
    isOpen.value = true;
  }

  function closeModal(): void {
    if (saving.value) return;

    isOpen.value = false;
  }

  function isFormValid(): boolean {
    const validations = [
      validateName(form.name),
      validateCnpj(form.cnpj),
      validateEmail(form.email),
      validatePhone(form.phone),
      validateAddress(form.address),
    ];

    return validations.every((result) => result === true);
  }

  async function savePublisher(): Promise<void> {
    if (saving.value) return;

    if (!isFormValid()) {
      return;
    }

    const name = form.name.trim();
    const cnpj = form.cnpj.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();
    const address = form.address.trim();

    saving.value = true;

    try {
      if (isEditing.value && originalId.value !== null) {
        await updatePublisher(originalId.value, {
          name,
          email,
          phone,
          address,
        });

        $q.notify({
          type: 'positive',
          message: t('publishers.messages.updateSuccess'),
        });
      } else {
        await createPublisher({
          name,
          cnpj,
          email,
          phone,
          address,
        });

        $q.notify({
          type: 'positive',
          message: t('publishers.messages.createSuccess'),
        });
      }

      isOpen.value = false;
      onSaved();
    } catch (error: unknown) {
      let message = t('publishers.messages.saveError');

      if (axios.isAxiosError(error)) {
        switch (error.response?.status) {
          case 409:
            message = t('publishers.messages.duplicate');
            break;

          case 400:
            message = t('publishers.messages.invalidData');
            break;

          case 404:
            message = t('publishers.messages.notFound');
            break;
        }
      }

      $q.notify({
        type: 'negative',
        message,
      });
    } finally {
      saving.value = false;
    }
  }

  return {
    form,
    isOpen,
    isEditing,
    saving,
    openCreateModal,
    openEditModal,
    closeModal,
    savePublisher,
  };
}
