<template>
  <div class="profile-settings">
    <div v-if="loading" class="profile-loading">
      <q-spinner color="primary" size="2.5rem" />
    </div>

    <template v-else-if="user">
      <div class="profile-avatar">
        <q-avatar size="7rem" class="avatar">
          <q-icon name="account_circle" size="7rem" />
        </q-avatar>

        <strong>{{ user.nameCompleted }}</strong>
      </div>

      <div class="profile-information">
        <div v-for="field in profileFields" :key="field.key" class="information-row">
          <q-icon :name="field.icon" />

          <span class="information-label"> {{ t(field.label) }}: </span>

          <span class="information-value">
            {{ field.value }}
          </span>
        </div>
      </div>

      <div class="profile-actions">
        <q-btn
          no-caps
          unelevated
          class="edit-button"
          :label="t('settings.editInformation')"
          @click="router.push('/settings/edit')"
        />
      </div>
    </template>

    <div v-else class="profile-loading">
      <q-btn flat no-caps icon="refresh" :label="t('settings.profile')" @click="loadProfile" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useProfile } from '@/composables/profile/useProfile';

const router = useRouter();
const { t } = useI18n({ useScope: 'global' });

const { user, loading, profileFields, loadProfile } = useProfile();

onMounted(() => {
  void loadProfile();
});
</script>

<style scoped>
.profile-settings {
  width: 100%;
}

.profile-loading {
  min-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.profile-avatar .q-avatar {
  border: 2px solid var(--border-color);
}

.profile-avatar strong {
  font-size: 1rem;
}

.profile-information {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  margin-top: 2rem;
}

.information-row {
  display: grid;
  grid-template-columns: 1.5rem 9rem minmax(0, 1fr);
  align-items: center;
  gap: 0.5rem;
}

.information-row > .q-icon {
  font-size: 1.3rem;
}

.information-label {
  font-size: 0.9rem;
  font-weight: 600;
}

.information-value {
  min-width: 0;
  font-size: 0.85rem;
  overflow-wrap: anywhere;
}

.profile-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
}

.edit-button {
  min-height: 2.5rem;
  padding: 0 1.5rem;
  border-radius: 5rem;
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  font-size: 0.9rem;
}
</style>
