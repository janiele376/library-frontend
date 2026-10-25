<template>
  <div class="accessibility-settings">
    <div class="setting-group">
      <h3>{{ t('settings.systemTheme') }}</h3>

      <div class="theme-options">
        <q-btn
          no-caps
          unelevated
          :label="t('settings.light')"
          :class="{ active: !isDark }"
          @click="setTheme(false)"
        />

        <q-btn
          no-caps
          unelevated
          :label="t('settings.dark')"
          :class="{ active: isDark }"
          @click="setTheme(true)"
        />
      </div>
    </div>

    <div class="setting-group">
      <h3>{{ t('settings.systemLanguage') }}</h3>

      <q-select
        v-model="selectedLanguage"
        :options="languages"
        emit-value
        map-options
        outlined
        dense
        options-dense
        class="language-select"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Dark } from 'quasar';
import { changeLanguage, type MessageLanguages } from '@/boot/i18n';

const { t, locale } = useI18n({ useScope: 'global' });

const isDark = ref(Dark.isActive);

const languages: { label: string; value: MessageLanguages }[] = [
  { label: 'Português (Brasil)', value: 'pt-BR' },
  { label: 'English (US)', value: 'en-US' },
  { label: 'Español (España)', value: 'es-ES' },
];

const selectedLanguage = computed<MessageLanguages>({
  get: () => locale.value as MessageLanguages,
  set: (value) => changeLanguage(value),
});

function setTheme(dark: boolean): void {
  isDark.value = dark;
  Dark.set(dark);

  document.body.classList.toggle('dark-mode', dark);

  localStorage.setItem('theme', dark ? 'dark' : 'light');
}

onMounted(() => {
  const savedTheme = localStorage.getItem('theme');

  setTheme(savedTheme === 'dark');
});
</script>

<style scoped>
.accessibility-settings {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  padding: 1rem 0 2rem;
}

.setting-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.setting-group h3 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: 1.3;
}

.theme-options {
  display: flex;
  gap: 0.75rem;
}

.theme-options .q-btn {
  min-width: 5rem;
  min-height: 2.5rem;
  border: 1px solid var(--border-color);
  border-radius: 5rem;
  background: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.theme-options .q-btn.active {
  background: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.language-select {
  width: 12rem;
}

.language-select :deep(.q-field__control) {
  border-radius: 5rem;
  background: var(--bg-input);
}

.language-select :deep(.q-field__native),
.language-select :deep(.q-field__input),
.language-select :deep(.q-field__append) {
  color: var(--text-main);
}
</style>
