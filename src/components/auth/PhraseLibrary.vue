<template>
  <div class="container-phrase">
    <div class="phrase">
      <h3 class="line1" data-translation="banner_welcome">Bem Vindo(a)</h3>

      <h1 class="line2" data-translation="banner_line2">A Leitura Abre</h1>

      <h1 class="line3" data-translation="banner_line3">Novos Mundos</h1>

      <h4 class="line4" data-translation="banner_line4">
        Acesse sua conta e assista a sua experiência
      </h4>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.container-phrase {
  flex: 1;
}

.container-phrase .phrase {
  max-width: 38rem;
}

.container-phrase .phrase .line1 {
  color: white;
  font-size: 1.875rem;
  font-weight: bold;
  margin-top: -2rem;
  text-shadow: 2px 2px 4px #000;
}

.container-phrase .phrase .line2 {
  color: white;
  font-size: 3.125rem;
  font-weight: bold;
  margin-top: -2rem;
  text-shadow: 2px 2px 4px #000;
}

.container-phrase .phrase .line3 {
  color: #dfa782;
  font-size: 3.125rem;
  font-weight: bold;
  margin-top: -2rem;
  text-shadow: 2px 2px 4px #000;
}

.container-phrase .phrase .line4 {
  font-weight: bold;
  margin-top: -2rem;
  text-shadow: 2px 2px 4px #000;
}
</style>
