<template>
  <q-page class="auth-body">
    <div class="container-phrase">
      <PhraseLibrary />
    </div>

    <div class="container-form">
      <q-btn class="arrow-back" icon="arrow_back" to="/" flat round dense size="20px"></q-btn>

      <div class="title-form">
        <img src="../assets/book-logo.svg" alt="Livro" />
        <h4>Esqueci Senha</h4>
      </div>

      <q-form class="info">
        <MainInput name="Email:" icon="email" type="email" placeholder="email@gmail.com" />

        <MainInput
          name="CPF:"
          icon="badge"
          type="text"
          mask="###.###.###-##"
          placeholder="000.000.000-00"
        />

        <MainInput name="Senha:" icon="lock" type="password" :password="true" placeholder="Senha" />

        <MainInput
          name="Confirmar Senha:"
          icon="lock"
          type="password"
          :password="true"
          placeholder="Confirmar Senha"
        />

        <BtnDivider name_confirm="Enviar" name_cancel="Cancelar" />
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/BtnDivider.vue';
import MainInput from '@/components/MainInput.vue';
</script>

<style scoped>
.container-form {
  background-color: var(--bg-card, #dbc2b0);
  color: var(--text-main, #55463c);
  width: 100%;
  max-width: 21rem;
  border-radius: 1.875rem;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.arrow-back {
  margin-right: auto;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-bottom: -2.5rem;
}

.arrow-back:hover {
  opacity: 0.5;
}

.title-form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title-form img {
  width: 3rem;
  margin-bottom: -1.5rem;
}

.title-form h4 {
  text-align: center;
  margin-bottom: 1rem;
}

.container-phrase {
  margin-top: 6rem;
}
.forgot-password {
  width: 100%;
  max-width: 13.5rem;
  display: flex;
  justify-content: flex-end;
  margin-top: 0.4rem;
  margin-bottom: 1.5rem;
  margin-left: 3rem;
}

.forgot-password a {
  color: var(--text-main, #55463c);
  font-size: 0.85rem;
}

.forgot-password a:hover {
  opacity: 0.7;
}
</style>
