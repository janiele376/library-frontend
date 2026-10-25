<template>
  <q-page class="settings-page">
    <main class="settings-main">
      <section class="settings-card">
        <div class="settings-heading">
          <q-btn
            flat
            round
            dense
            icon="arrow_back"
            :aria-label="t('settings.back')"
            @click="goBack"
          />

          <h2>{{ t('settings.title') }}</h2>
        </div>

        <div v-if="!authStore.isAdmin" class="settings-tabs">
          <q-btn
            no-caps
            unelevated
            :label="t('settings.profile')"
            :class="{ active: activeTab === 'profile' }"
            @click="activeTab = 'profile'"
          />

          <q-btn
            no-caps
            unelevated
            :label="t('settings.accessibility')"
            :class="{ active: activeTab === 'accessibility' }"
            @click="activeTab = 'accessibility'"
          />
        </div>

        <q-separator class="settings-divider" />

        <ProfileSettings v-if="!authStore.isAdmin && activeTab === 'profile'" />

        <AccessibilitySettings v-else />
      </section>
    </main>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import ProfileSettings from '@/components/settings/ProfileSettings.vue';
import AccessibilitySettings from '@/components/settings/AccessibilitySettings.vue';
import { useAuthStore } from '@/stores/authStore';

type SettingsTab = 'profile' | 'accessibility';

const router = useRouter();
const { t } = useI18n({ useScope: 'global' });
const authStore = useAuthStore();

const activeTab = ref<SettingsTab>('profile');

function goBack() {
  void router.push('/dashboard');
}
</script>

<style scoped>
.settings-page {
  min-height: 100vh;
  background: var(--bg-page);
  color: var(--text-main);
}

.settings-header {
  min-height: 7rem;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--bg-card);
}

.settings-header img {
  width: 2.8rem;
}

.settings-header h1 {
  margin: 0;
  font-size: 1.875rem;
  line-height: 1.3;
}

.settings-main {
  min-height: calc(100vh - 7rem);
  padding: 2.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.settings-card {
  width: 30rem;
  max-width: 100%;
  padding: 1.5rem 2rem 2rem;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: 1.875rem;
}

.settings-heading {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.settings-heading h2 {
  margin: 0;
  font-size: 1.5rem;
  line-height: 1.3;
}

.settings-tabs {
  display: flex;
  width: 20rem;
  max-width: 100%;
  margin: 0 auto;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  border-radius: 5rem;
}

.settings-tabs .q-btn {
  flex: 1;
  min-height: 2.5rem;
  border-radius: 5rem;
  color: var(--text-main);
  font-size: 0.9rem;
}

.settings-tabs .q-btn.active {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.settings-divider {
  margin: 1.5rem 0;
  background: var(--border-color);
}
</style>
