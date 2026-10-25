import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import axios from 'axios';

import { getUserById, adminUpdateUser } from '@/services/userService';

import type { UserResponse, AdminUpdateUserRequest } from '@/types/user';

import { isValidCPF } from '@/utils/cpfValidator';

import { formatDateToISO, formatDateToBR } from '@/utils/dateUtils';

import {
  isValidFullName,
  isValidEmail,
  isValidPhone,
  isValidAddress,
} from '@/utils/userValidators';

type EditUserForm = {
  nameCompleted: string;
  email: string;
  phone: string;
  cpf: string;
  birthDate: string;
  address: string;
};

type EditUserResult = { success: true; updated: boolean } | { success: false; message: string };

export function useEditUser() {
  const { t } = useI18n({ useScope: 'global' });

  const loading = ref(false);
  const loaded = ref(false);
  const saving = ref(false);

  const selectedUserId = ref<number | null>(null);
  const originalUser = ref<UserResponse | null>(null);

  const form = reactive<EditUserForm>({
    nameCompleted: '',
    email: '',
    phone: '',
    cpf: '',
    birthDate: '',
    address: '',
  });

  let loadSequence = 0;

  async function loadUser(id: number): Promise<boolean> {
    const requestId = ++loadSequence;

    selectedUserId.value = id;
    originalUser.value = null;

    loading.value = true;
    loaded.value = false;

    try {
      const user = await getUserById(id);

      if (requestId !== loadSequence || selectedUserId.value !== id) {
        return false;
      }

      originalUser.value = user;

      form.nameCompleted = user.nameCompleted;
      form.email = user.email;
      form.phone = user.phone;
      form.cpf = user.cpf;
      form.birthDate = formatDateToBR(user.dateBirth);
      form.address = user.address;

      loaded.value = true;

      return true;
    } catch {
      return false;
    } finally {
      if (requestId === loadSequence) {
        loading.value = false;
      }
    }
  }

  function resetUser(): void {
    ++loadSequence;

    selectedUserId.value = null;
    originalUser.value = null;

    loading.value = false;
    loaded.value = false;

    form.nameCompleted = '';
    form.email = '';
    form.phone = '';
    form.cpf = '';
    form.birthDate = '';
    form.address = '';
  }

  function validateForm(): string | null {
    if (!originalUser.value) {
      return t('users.edit.validation.userNotIdentified');
    }

    const nameCompleted = form.nameCompleted.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const cpf = form.cpf.trim();
    const address = form.address.trim();

    const dateBirth = formatDateToISO(form.birthDate);

    if (!isValidFullName(nameCompleted)) {
      return t('users.edit.validation.invalidName');
    }

    if (!isValidEmail(email)) {
      return t('users.edit.validation.invalidEmail');
    }

    if (!isValidPhone(phone)) {
      return t('users.edit.validation.invalidPhone');
    }

    const cpfChanged = cpf.replace(/\D/g, '') !== originalUser.value.cpf.replace(/\D/g, '');

    if (cpfChanged && !isValidCPF(cpf)) {
      return t('users.edit.validation.invalidCpf');
    }

    if (!dateBirth) {
      return t('users.edit.validation.invalidBirthDate');
    }

    const today = new Date();

    const todayISO = [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, '0'),
      String(today.getDate()).padStart(2, '0'),
    ].join('-');

    if (dateBirth >= todayISO) {
      return t('users.edit.validation.futureBirthDate');
    }

    if (!isValidAddress(address)) {
      return t('users.edit.validation.addressRequired');
    }

    return null;
  }

  function buildUpdateData(): AdminUpdateUserRequest {
    const original = originalUser.value;

    if (!original) {
      return {};
    }

    const data: AdminUpdateUserRequest = {};

    const nameCompleted = form.nameCompleted.trim();
    const email = form.email.trim();
    const phone = form.phone.trim();
    const cpf = form.cpf.trim();
    const address = form.address.trim();

    const dateBirth = formatDateToISO(form.birthDate);

    if (nameCompleted !== original.nameCompleted) {
      data.nameCompleted = nameCompleted;
    }

    if (email !== original.email) {
      data.email = email;
    }

    if (phone !== original.phone) {
      data.phone = phone;
    }

    if (cpf.replace(/\D/g, '') !== original.cpf.replace(/\D/g, '')) {
      data.cpf = cpf;
    }

    if (address !== original.address) {
      data.address = address;
    }

    if (dateBirth && dateBirth !== original.dateBirth) {
      data.dateBirth = dateBirth;
    }

    return data;
  }

  function getErrorMessage(error: unknown): string {
    if (!axios.isAxiosError(error)) {
      return t('users.edit.messages.unexpectedError');
    }

    if (!error.response) {
      return t('users.edit.messages.connectionError');
    }

    switch (error.response.status) {
      case 400:
        return t('users.edit.messages.invalidData');

      case 403:
        return t('users.edit.messages.forbidden');

      case 404:
        return t('users.edit.messages.notFound');

      case 409:
        return t('users.edit.messages.duplicate');

      default:
        return t('users.edit.messages.updateError');
    }
  }

  async function saveUser(): Promise<EditUserResult> {
    if (saving.value || !loaded.value || selectedUserId.value === null) {
      return {
        success: false,
        message: t('users.edit.messages.cannotStartUpdate'),
      };
    }

    const validationError = validateForm();

    if (validationError) {
      return {
        success: false,
        message: validationError,
      };
    }

    const data = buildUpdateData();

    if (Object.keys(data).length === 0) {
      return {
        success: true,
        updated: false,
      };
    }

    const id = selectedUserId.value;

    saving.value = true;

    try {
      await adminUpdateUser(id, data);

      return {
        success: true,
        updated: true,
      };
    } catch (error: unknown) {
      return {
        success: false,
        message: getErrorMessage(error),
      };
    } finally {
      saving.value = false;
    }
  }

  return {
    form,
    loading,
    loaded,
    saving,
    selectedUserId,
    loadUser,
    resetUser,
    saveUser,
  };
}
