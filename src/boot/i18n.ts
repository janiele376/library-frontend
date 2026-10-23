import { defineBoot } from '#q-app';
import { createI18n } from 'vue-i18n';

import messages from '../i18n';

export type MessageLanguages = 'pt-BR' | 'en-US' | 'es-ES';

const STORAGE_KEY = 'library-language';

function getSavedLocale(): MessageLanguages {
  const savedLocale = localStorage.getItem(STORAGE_KEY);

  if (savedLocale === 'pt-BR' || savedLocale === 'en-US' || savedLocale === 'es-ES') {
    return savedLocale;
  }

  return 'pt-BR';
}

export const i18n = createI18n({
  legacy: false,
  locale: getSavedLocale(),
  fallbackLocale: 'pt-BR',
  messages,
  globalInjection: true,
});

export function changeLanguage(locale: MessageLanguages): void {
  i18n.global.locale.value = locale;

  localStorage.setItem(STORAGE_KEY, locale);

  document.documentElement.lang = locale;
}

export default defineBoot(({ app }) => {
  app.use(i18n);

  document.documentElement.lang = i18n.global.locale.value;
});
