<template>
  <q-page class="auth-body">
    <div class="container-phrase">
      <PhraseLibrary />
    </div>

    <div class="container-form">
      <div class="title-form">
        <img src="../assets/book-logo.svg" alt="Livro" />
        <h4>Entrar</h4>
      </div>

      <q-form class="info" @submit.prevent="btnLogin">
        <MainInput
          v-model="email"
          name="Email:"
          icon="email"
          type="email"
          placeholder="email@gmail.com"
        />

        <MainInput
          v-model="password"
          name="Senha:"
          icon="lock"
          type="password"
          :password="true"
          placeholder="Senha"
        />

        <div class="forgot-password">
          <RouterLink to="/forgot-password">Esqueci a senha</RouterLink>
        </div>

        <BtnDivider
          name_confirm="Entrar"
          name_cancel="Cadastre-se"
          path_cancel="/register"
          :action_confirm="btnLogin"
          :loading="loading"
        />
      </q-form>
    </div>
  </q-page>
  <AuthFooter />
</template>

<script setup lang="ts">
import PhraseLibrary from '@/components/auth/PhraseLibrary.vue';
import BtnDivider from '@/components/BtnDivider.vue';
import MainInput from '@/components/MainInput.vue';
import AuthFooter from '@/components/auth/AuthFooter.vue';

import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import axios from 'axios';
import { login } from '@/services/authService';

const $q = useQuasar();
const router = useRouter();

const email = ref('');
const password = ref('');
const loading = ref(false);

async function btnLogin() {
  if (loading.value) return;

  if (!email.value.trim() || !password.value) {
    $q.notify({
      type: 'warning',
      message: 'Preencha o e-mail e a senha.',
    });
    return;
  }

  loading.value = true;

  try {
    const response = await login({
      email: email.value.trim(),
      password: password.value,
    });

    if (!response.token) {
      throw new Error('Token não recebido do servidor.');
    }

    sessionStorage.setItem('token', response.token);

    $q.notify({
      type: 'positive',
      message: 'Login realizado com sucesso!',
    });

    await router.replace('/dashboard');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 400 || status === 401) {
        $q.notify({
          type: 'negative',
          message: 'E-mail ou senha inválidos.',
        });
      } else if (!error.response) {
        $q.notify({
          type: 'negative',
          message: 'Não foi possível conectar ao servidor.',
        });
      } else {
        $q.notify({
          type: 'negative',
          message: 'Não foi possível realizar o login.',
        });
      }
    } else {
      console.error('Erro inesperado no login:', error);

      $q.notify({
        type: 'negative',
        message: 'Ocorreu um erro inesperado.',
      });
    }
  } finally {
    loading.value = false;
  }
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
