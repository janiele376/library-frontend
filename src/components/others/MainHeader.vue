<template>
  <header id="header">
    <div class="container-title">
      <img
        class="img-book"
        src="../../assets/book-logo.svg"
        :alt="t('header.accessibility.logo')"
      />

      <h2 class="title">
        {{ t('header.title') }}
      </h2>
    </div>

    <nav v-if="login" class="container-user-header" :aria-label="t('header.title')">
      <div class="header-item">
        <div class="icon-wrapper">
          <q-icon name="account_circle" class="header-icon" />
        </div>

        <span id="tenant-logged-name" class="header-label">
          {{ t('header.user') }}
        </span>
      </div>

      <div class="header-item">
        <q-btn
          class="icon-wrapper header-btn"
          to="/settings"
          flat
          dense
          unelevated
          :aria-label="t('header.accessibility.settingsButton')"
        >
          <q-icon name="settings" class="header-icon" />
        </q-btn>

        <span class="header-label">
          {{ t('header.settings') }}
        </span>
      </div>

      <div class="header-item">
        <q-btn
          class="icon-wrapper header-btn"
          flat
          dense
          unelevated
          :aria-label="t('header.accessibility.logoutButton')"
          @click="logout"
        >
          <q-icon name="logout" class="header-icon" />
        </q-btn>

        <span class="header-label">
          {{ t('header.logout') }}
        </span>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

export interface InputForm {
  login?: boolean;
}

withDefaults(defineProps<InputForm>(), {
  login: false,
});

const router = useRouter();
const { t } = useI18n({ useScope: 'global' });

function logout(): void {
  sessionStorage.removeItem('token');
  void router.replace('/');
}
</script>

<style scoped>
#header {
  width: 100%;
  min-height: 6rem;
  padding: 0.75rem 2rem;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  background-color: var(--bg-card);
  color: var(--text-main);
}

.container-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.img-book {
  width: 2.8rem;
  height: auto;
  flex-shrink: 0;
}

.title {
  margin: 0;
  font-size: 1.875rem;
  font-weight: 700;
  line-height: 1.2;
}

.container-user-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.25rem;
  flex-shrink: 0;
}

.header-item {
  width: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  text-align: center;
}

.icon-wrapper {
  width: 2.5rem;
  height: 2.5rem;
  min-width: 2.5rem;
  min-height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  color: var(--text-main);
}

.header-icon {
  font-size: 1.8rem;
  line-height: 1;
  color: var(--text-main);
}

.header-btn {
  border-radius: 50%;
  transition: opacity 0.2s ease;
}

.header-btn:hover {
  opacity: 0.65;
}

.header-label {
  width: 100%;
  min-height: 1.8rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-size: 0.8rem;
  line-height: 1.2;
  text-align: center;
  color: var(--text-main);
  overflow-wrap: anywhere;
}
</style>
