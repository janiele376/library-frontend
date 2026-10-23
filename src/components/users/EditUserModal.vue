<template>
  <q-dialog v-model="isModalOpen" class="modal-edit-user" persistent>
    <q-card class="container-modal">
      <div class="modal-header">
        <q-btn
          type="button"
          flat
          round
          dense
          class="btn-back-modal"
          icon="arrow_back"
          :aria-label="t('users.editModal.back')"
          :disable="saving"
          @click="closeModal"
        />

        <h2>{{ t('users.editModal.title') }}</h2>
      </div>

      <div v-if="loading" class="modal-loading">
        <q-spinner color="primary" size="2.5rem" />
      </div>

      <EditUserForm
        v-else-if="loaded"
        v-model:form="editableForm"
        :saving="saving"
        @save="saveUser"
        @cancel="closeModal"
      />

      <div v-else class="modal-loading">
        <q-btn
          type="button"
          flat
          no-caps
          icon="refresh"
          :label="t('users.editModal.retry')"
          @click="retryLoad"
        />
      </div>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useQuasar } from 'quasar';

import EditUserForm from '@/components/users/EditUserForm.vue';
import { useEditUser } from '@/composables/useEditUser';

const { t } = useI18n({ useScope: 'global' });
const $q = useQuasar();

const emit = defineEmits<{
  updated: [];
}>();

const isModalOpen = ref(false);

const {
  form,
  loading,
  loaded,
  saving,
  selectedUserId,
  loadUser,
  resetUser,
  saveUser: updateUser,
} = useEditUser();

const editableForm = computed({
  get: () => form,
  set: (value) => {
    Object.assign(form, value);
  },
});

async function openModal(id: number): Promise<void> {
  if (saving.value) return;

  isModalOpen.value = true;

  const success = await loadUser(id);

  if (!success && isModalOpen.value && selectedUserId.value === id) {
    $q.notify({
      type: 'negative',
      message: t('users.editModal.loadError'),
    });
  }
}

function closeModal(): void {
  if (saving.value) return;

  isModalOpen.value = false;
  resetUser();
}

async function retryLoad(): Promise<void> {
  if (selectedUserId.value === null) return;

  const id = selectedUserId.value;
  const success = await loadUser(id);

  if (!success && isModalOpen.value && selectedUserId.value === id) {
    $q.notify({
      type: 'negative',
      message: t('users.editModal.loadError'),
    });
  }
}

async function saveUser(): Promise<void> {
  if (saving.value || !loaded.value) return;

  const result = await updateUser();

  if (!result.success) {
    $q.notify({
      type: 'negative',
      message: result.message,
    });
    return;
  }

  if (!result.updated) {
    $q.notify({
      type: 'info',
      message: t('users.editModal.noChanges'),
    });
    return;
  }

  $q.notify({
    type: 'positive',
    message: t('users.editModal.updateSuccess'),
  });

  emit('updated');
  closeModal();
}

defineExpose({
  openModal,
  closeModal,
});
</script>

<style scoped>
.modal-edit-user :deep(.q-dialog__inner) {
  padding: 1rem;
}

.container-modal {
  width: 100%;
  max-width: 35rem;
  max-height: 90vh;
  padding: 2rem;
  border: none;
  border-radius: 1.5rem;
  background-color: var(--bg-card);
  color: var(--text-main);
  overflow-y: auto;
  box-shadow: none;
}

.modal-header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--text-main);
}

.btn-back-modal {
  position: absolute;
  left: 0;
  color: var(--text-main);
  transition: opacity 0.2s;
}

.btn-back-modal:hover {
  opacity: 0.7;
}

.modal-loading {
  min-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
