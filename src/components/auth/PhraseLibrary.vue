<template>
  <div class="container-phrase">
    <div class="phrase">
      <h2 class="line1">
        {{ t('auth.phrase.welcome') }}
      </h2>

      <h1 class="line2">
        {{ t('auth.phrase.line2') }}
      </h1>

      <h1 class="line3">
        {{ t('auth.phrase.line3') }}
      </h1>

      <h3 class="line4">
        {{ t('auth.phrase.line4') }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
</script>

<style scoped>
.container-phrase {
  flex: 1;
  min-width: 0;
  display: flex;
  align-items: center;
}

.phrase {
  width: 100%;
  max-width: 38rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.phrase .line1,
.phrase .line2,
.phrase .line3,
.phrase .line4 {
  position: static;
  display: block;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  transform: none;
  text-align: left;
  letter-spacing: normal;
  text-shadow: 2px 2px 4px var(--shadow-color);
}

.container-phrase .phrase .line1 {
  color: var(--text-light);
  font-size: clamp(1.3rem, 2.5vw, 1.875rem);
  font-weight: 700;
  line-height: 1.3;
}

.container-phrase .phrase .line2 {
  color: var(--text-light);
  font-size: clamp(2rem, 4vw, 3.125rem);
  font-weight: 700;
  line-height: 1.15;
}

.container-phrase .phrase .line3 {
  color: var(--text-highlight);
  font-size: clamp(2rem, 4vw, 3.125rem);
  font-weight: 700;
  line-height: 1.15;
}

.container-phrase .phrase .line4 {
  color: var(--text-light);
  font-size: clamp(0.9rem, 1.5vw, 1rem);
  font-weight: 600;
  line-height: 1.5;
  margin-top: 0.5rem;
}
</style>
