<template>
  <q-page class="edit-profile-page">
    <main class="edit-main">
      <section class="edit-card">
        <div class="edit-heading">
          <q-btn flat round dense icon="arrow_back" @click="router.push('/settings')" />

          <h2>{{ t('settings.title') }}</h2>
        </div>

        <EditProfileForm />
      </section>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import EditProfileForm from '@/components/settings/EditProfileForm.vue';

const router = useRouter();
const { t } = useI18n({ useScope: 'global' });
</script>

<style scoped>
.edit-profile-page {
  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-main);
}

.edit-header {
  min-height: 7rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-card);
}

.edit-header img {
  width: 2.8rem;
}

.edit-header h1 {
  margin: 0;
  font-size: 1.875rem;
  line-height: 1.3;
}

.edit-main {
  min-height: calc(100vh - 7rem);
  padding: 2.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.edit-card {
  width: 34rem;
  max-width: 100%;
  padding: 1.5rem 2rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 1.875rem;
}

.edit-heading {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.edit-heading h2 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.3;
}
</style>
