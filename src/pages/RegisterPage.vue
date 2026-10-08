<template>
  <q-page class="auth-body">
    <div class="container-phrase">
      <PhraseLibrary />
    </div>

    <div class="container-form">
      <q-btn class="arrow-back" icon="arrow_back" to="/" flat round dense size="20px"></q-btn>

      <div class="title-form">
        <img src="../assets/book-logo.svg" alt="Livro" />
        <h4>Cadastro</h4>
      </div>

      <q-form class="info">
        <MainInput name="Nome:" icon="person" type="text" placeholder="Janiele Bastos" />

        <MainInput
          name="Data de Nascimento:"
          icon="event"
          type="text"
          mask="##/##/####"
          :date="true"
          placeholder="dd/mm/aaaa"
        />

        <MainInput name="Email:" icon="email" type="email" placeholder="email@gmail.com" />

        <MainInput
          name="CPF:"
          icon="badge"
          type="text"
          mask="###.###.###-##"
          placeholder="000.000.000-00"
        />

        <MainInput
          name="Telefone:"
          icon="phone"
          type="tel"
          mask="(##) # ####-####"
          placeholder="(85) 9 9999-9999"
        />

        <MainInput
          name="Localização:"
          icon="location_on"
          type="text"
          placeholder="Rua, número, bairro..."
        />

        <MainInput name="Senha:" icon="lock" type="password" :password="true" placeholder="Senha" />

        <MainInput
          name="Confirmar Senha:"
          icon="lock"
          type="password"
          :password="true"
          placeholder="Confirmar senha"
        />

        <BtnDivider name_confirm="Criar Conta" name_cancel="Cancelar" />
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
  gap: 0.4rem;
}

.title-form img {
  width: 3rem;
  margin-top: -1rem;
}

.title-form h4 {
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
}
</style>
