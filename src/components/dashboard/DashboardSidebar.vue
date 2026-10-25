<template>
  <nav class="container-menu">
    <router-link to="/dashboard" class="menu-item">
      {{ t('dashboard.sidebar.dashboard') }}
    </router-link>

    <router-link to="/users" class="menu-item">
      {{ t('dashboard.sidebar.users') }}
    </router-link>

    <router-link to="/rentals" class="menu-item">
      {{ t('dashboard.sidebar.rentals') }}
    </router-link>

    <router-link to="/books" class="menu-item">
      {{ t('dashboard.sidebar.books') }}
    </router-link>

    <router-link to="/publishers" class="menu-item">
      {{ t('dashboard.sidebar.publishers') }}
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
</script>

<style scoped>
.container-menu {
  width: 10rem;
  flex-shrink: 0;
  background-color: var(--btn-secondary-bg);
  display: flex;
  flex-direction: column;
}

.menu-item {
  width: 100%;
  min-height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
  border: 0.0625rem solid var(--border-color);
  text-decoration: none;
  font-size: 1.125rem;
  transition: background-color 0.2s;
}

.menu-item:hover {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.menu-item.router-link-exact-active {
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
  border-color: var(--btn-primary-border);
}
</style>
