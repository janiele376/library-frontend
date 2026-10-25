<template>
  <footer class="footer">
    <div class="container-info">
      <div class="about-us">
        <h4>{{ t('footer.about.title') }}</h4>

        <p>
          {{ t('footer.about.firstLine') }}
        </p>

        <p>
          {{ t('footer.about.secondLine') }}
        </p>
      </div>

      <div class="contact-us">
        <h4>{{ t('footer.contact.title') }}</h4>

        <ul>
          <li>
            <q-icon name="email" />
            <span>biblioteca@gmail.com</span>
          </li>

          <li>
            <q-icon name="phone" />
            <span>99 9999-99999</span>
          </li>

          <li>
            <q-icon :name="fabInstagram" />
            <span>biblioteca23</span>
          </li>
        </ul>
      </div>

      <div class="our-locations">
        <h4>{{ t('footer.locations.title') }}</h4>

        <ul>
          <li>Rua Padre Filho, 263 - Centro</li>
          <li>Rua IV, 60 - Paulista</li>
          <li>Rua Norte Europeu, 110 - Vale Central</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { fabInstagram } from '@quasar/extras/fontawesome-v7';

const { t } = useI18n({ useScope: 'global' });
</script>

<style scoped>
.footer {
  width: 100%;
  background-color: var(--bg-card);
  color: var(--text-main);
}

.container-info {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 14rem), 1fr));
  gap: 1.5rem;
  padding: 1.75rem clamp(1.25rem, 5vw, 4rem);
}

.footer h4 {
  margin: 0 0 0.75rem;
  color: var(--text-main);
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.3;
}

.about-us p {
  margin: 0 0 0.35rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.footer ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer li {
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
}

.contact-us li {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.contact-us .q-icon {
  font-size: 1.1rem;
  flex-shrink: 0;
}

.our-locations li {
  padding-left: 1rem;
  position: relative;
}

.our-locations li::before {
  content: '•';
  position: absolute;
  left: 0;
}
</style>
