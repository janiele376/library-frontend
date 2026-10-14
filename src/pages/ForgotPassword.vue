<template>
  <q-page class="auth-body">
    <div class="container-phrase">
      <PhraseLibrary />
    </div>

    <div class="container-form">
      <q-btn class="arrow-back" icon="arrow_back" to="/" flat round dense size="20px" />

      <div class="title-form">
        <img src="../assets/book-logo.svg" alt="Livro" />
        <h4>Esqueci Senha</h4>
      </div>

      <q-form class="info" @submit.prevent="btnForgotPassword">
        <MainInput
          v-model="email"
          name="Email:"
          icon="email"
          type="email"
          placeholder="email@gmail.com"
        />

        <MainInput
          v-model="cpf"
          name="CPF:"
          icon="badge"
          type="text"
          mask="###.###.###-##"
          placeholder="000.000.000-00"
        />

        <MainInput
          v-model="password"
          name="Nova Senha:"
          icon="lock"
          type="password"
          :password="true"
          placeholder="Nova Senha"
        />

        <MainInput
          v-model="confirmPassword"
          name="Confirmar Nova Senha:"
          icon="lock"
          type="password"
          :password="true"
          placeholder="Confirmar Nova Senha"
        />

        <BtnDivider
          name_confirm="Enviar"
          name_cancel="Cancelar"
          :action_confirm="btnForgotPassword"
          :action_cancel="btnCancel"
          :loading="loading"
        />
      </q-form>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useQuasar } from 'quasar';
import { useRouter } from 'vue-router';
import axios from 'axios';

import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/BtnDivider.vue';
import MainInput from '@/components/MainInput.vue';
import { forgotPassword } from '@/services/authService';

const $q = useQuasar();
const router = useRouter();

const email = ref('');
const cpf = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

async function btnForgotPassword() {
  if (loading.value) return;

  if (!email.value.trim() || !cpf.value.trim() || !password.value || !confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'Preencha todos os campos.',
    });
    return;
  }

  const formattedEmail = email.value.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formattedEmail)) {
    $q.notify({
      type: 'negative',
      message: 'Informe um e-mail válido.',
    });
    return;
  }

  const cpfNumbers = cpf.value.replace(/\D/g, '');

  if (cpfNumbers.length !== 11) {
    $q.notify({
      type: 'negative',
      message: 'O CPF deve conter 11 dígitos.',
    });
    return;
  }

  const cpfFormatted = `${cpfNumbers.slice(0, 3)}.${cpfNumbers.slice(3, 6)}.${cpfNumbers.slice(6, 9)}-${cpfNumbers.slice(9, 11)}`;

  if (password.value !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'As senhas não coincidem.',
    });
    return;
  }

  loading.value = true;

  try {
    await forgotPassword({
      email: formattedEmail,
      cpf: cpfFormatted,
      newPassword: password.value,
      confirmPassword: confirmPassword.value,
    });

    $q.notify({
      type: 'positive',
      message: 'Senha alterada com sucesso!',
    });

    password.value = '';
    confirmPassword.value = '';

    await router.replace('/');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const errors = error.response?.data?.errors;

      console.error('Status:', status);
      console.error('Erros de validação:', errors);

      let message = 'Não foi possível alterar a senha.';

      if (status === 400) {
        message = 'Verifique os dados informados.';
      } else if (status === 401 || status === 403) {
        message = 'Não foi possível validar os dados informados.';
      } else if (status === 404) {
        message = 'Não foi possível localizar os dados informados.';
      } else if (!error.response) {
        message = 'Não foi possível conectar ao servidor.';
      }

      $q.notify({
        type: 'negative',
        message,
      });
    } else {
      console.error('Erro inesperado:', error);

      $q.notify({
        type: 'negative',
        message: 'Ocorreu um erro inesperado.',
      });
    }
  } finally {
    loading.value = false;
  }
}

async function btnCancel() {
  email.value = '';
  cpf.value = '';
  password.value = '';
  confirmPassword.value = '';

  await router.push('/');
}
</script>

<style scoped>
.container-form {
  background-color: var(--bg-card);
  color: var(--text-main);
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
  color: var(--text-main);
  font-size: 0.85rem;
}

.forgot-password a:hover {
  opacity: 0.7;
}
</style>
