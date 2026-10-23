<template>
  <div id="header">
    <div class="container-title">
      <img
        class="img-book"
        src="../../assets/book-logo.svg"
        :alt="t('header.accessibility.logo')"
      />

      <h2 class="title">
        {{ t('header.title') }}
      </h2>

      <div v-if="login" class="container-user-header">
        <div class="imgs">
          <img
            class="img-user"
            src="../../assets/book-logo.svg"
            :alt="t('header.accessibility.userImage')"
          />

          <q-btn
            class="img-adjustments"
            icon="settings"
            to="/settings"
            flat
            round
            dense
            size="20px"
            :aria-label="t('header.accessibility.settingsButton')"
          />

          <q-btn
            class="img-logout"
            icon="logout"
            flat
            round
            dense
            size="20px"
            :aria-label="t('header.accessibility.logoutButton')"
            @click="logout"
          />
        </div>

        <div class="text">
          <p id="tenant-logged-name">
            {{ t('header.user') }}
          </p>

          <p>{{ t('header.settings') }}</p>

          <p>{{ t('header.logout') }}</p>
        </div>
      </div>
    </div>
  </div>
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
const { t } = useI18n();

function logout() {
  sessionStorage.removeItem('token');
  void router.replace('/');
}
</script>

<style scoped>
#header {
  background-color: var(--bg-card);
  color: var(--text-main);
  width: 100%;
  min-height: 7rem;
  display: flex;
  align-items: center;
  padding: 0 2rem;
}

#header .container-title {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

#header .title {
  font-size: 1.875rem;
}

#header .img-book {
  width: 2.8rem;
  height: auto;
  margin-top: -1rem;
}

#header .container-user-header {
  margin-left: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.2rem;
}

#header .container-user-header .imgs {
  display: flex;
  align-items: center;
  gap: 1rem;
}

#header .container-user-header .text {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  font-size: 0.8rem;
  margin-right: 1rem;
}

#header .container-user-header .imgs .img-user {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  object-fit: cover;
}

#header .container-user-header .imgs .img-adjustments,
#header .container-user-header .imgs .img-logout {
  width: 2.2rem;
  height: 2.2rem;
  cursor: pointer;
  transition: opacity 0.2s;
  color: var(--text-main);
}

#header .container-user-header .imgs .img-adjustments:hover,
#header .container-user-header .imgs .img-logout:hover {
  opacity: 0.6;
}
</style>
