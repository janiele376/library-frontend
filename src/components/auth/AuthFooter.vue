<template>
  <footer class="footer">
    <div class="container-info">
      <div class="about-us">
        <h4 data-translation="footer_about_title">Sobre Nós</h4>

        <p class="text-mobile" data-translation="footer_about_mobile">
          Criando valor e inspiração desde 2023.
        </p>

        <p class="text-computer" data-translation="footer_about_desktop">
          Criando valor e inspiração desde 2023.<br />
          Nossa missão é informar você aos seus<br />
          produtos com praticidade.
        </p>
      </div>

      <div class="container-contact-us">
        <div class="contact-us">
          <h4 data-translation="footer_contact_title">Contate-Nos</h4>

          <ul>
            <li>biblioteca@gmail.com</li>
            <li>99 9999-99999</li>
            <li>biblioteca23</li>
          </ul>
        </div>

        <div class="imgs-contact-us">
          <q-icon name="email" class="img"></q-icon>

          <q-icon name="phone" class="img"></q-icon>

          <q-icon :name="fabInstagram" class="img"></q-icon>
        </div>
      </div>

      <div class="our-locations">
        <h4 data-translation="footer_locations_title">Nossos Locais</h4>

        <ul>
          <li data-translation="location_1">Rua Padre Filho, 263 - Centro</li>

          <li data-translation="location_2">Rua IV, 60 - Paulista</li>

          <li data-translation="location_3">Rua Norte Europeu, 110 - Vale Central</li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { fabInstagram } from '@quasar/extras/fontawesome-v7';
</script>

<style scoped>
.footer {
  width: 100%;
}

.footer .container-info {
  background-color: var(--bg-card, #dbc2b0);
  color: var(--text-main, #55463c);
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 3rem;
  padding: 2rem 4rem;
}

.footer h4 {
  margin-bottom: 0.5rem;
}

.footer ul {
  list-style-position: inside;
}

.footer .about-us .text-mobile {
  display: none;
}

.footer .about-us .text-computer {
  display: block;
}

.container-contact-us {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.imgs-contact-us {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 5.5rem;
}
</style>
