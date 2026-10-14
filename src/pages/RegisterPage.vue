<template>
  <q-page class="auth-body">
    <div class="container-phrase">
      <PhraseLibrary />
    </div>

    <div class="container-form">
      <q-btn class="arrow-back" icon="arrow_back" to="/" flat round dense size="20px" />

      <div class="title-form">
        <img src="../assets/book-logo.svg" alt="Livro" />
        <h4>Cadastro</h4>
      </div>

      <q-form class="info" @submit.prevent="btnRegister">
        <MainInput
          v-model="nameCompleted"
          name="Nome:"
          icon="person"
          type="text"
          placeholder="Nome completo"
        />

        <MainInput
          v-model="dateBirth"
          name="Data de nascimento:"
          icon="event"
          type="text"
          mask="##/##/####"
          :date="true"
          :disable-future-dates="true"
          placeholder="DD/MM/AAAA"
        />

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
          v-model="phone"
          name="Telefone:"
          icon="phone"
          type="tel"
          mask="(##) #####-####"
          placeholder="(85) 99999-9999"
        />

        <MainInput
          v-model="address"
          name="Localização:"
          icon="location_on"
          type="text"
          placeholder="Rua, número, bairro..."
        />

        <MainInput
          v-model="password"
          name="Senha:"
          icon="lock"
          type="password"
          :password="true"
          placeholder="Senha"
        />

        <MainInput
          v-model="confirmPassword"
          name="Confirmar Senha:"
          icon="lock"
          type="password"
          :password="true"
          placeholder="Confirmar senha"
        />

        <BtnDivider
          name_confirm="Criar Conta"
          name_cancel="Cancelar"
          :action_confirm="btnRegister"
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
import { register } from '@/services/authService';
import { formatDateToISO } from '@/utils/dateUtils';

const $q = useQuasar();
const router = useRouter();

const nameCompleted = ref('');
const dateBirth = ref('');
const email = ref('');
const cpf = ref('');
const phone = ref('');
const address = ref('');
const password = ref('');
const confirmPassword = ref('');
const loading = ref(false);

async function btnRegister() {
  if (loading.value) return;

  if (
    !nameCompleted.value.trim() ||
    !dateBirth.value ||
    !email.value.trim() ||
    !cpf.value ||
    !phone.value ||
    !address.value.trim() ||
    !password.value ||
    !confirmPassword.value
  ) {
    $q.notify({
      type: 'negative',
      message: 'Preencha todos os campos.',
    });
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value.trim())) {
    $q.notify({
      type: 'negative',
      message: 'Informe um e-mail válido.',
    });
    return;
  }

  if (password.value !== confirmPassword.value) {
    $q.notify({
      type: 'negative',
      message: 'As senhas não coincidem.',
    });
    return;
  }

  const cpfNumbers = cpf.value.replace(/\D/g, '');
  const cpfFormatted = `${cpfNumbers.slice(0, 3)}.${cpfNumbers.slice(3, 6)}.${cpfNumbers.slice(6, 9)}-${cpfNumbers.slice(9, 11)}`;

  if (cpfNumbers.length !== 11) {
    $q.notify({
      type: 'negative',
      message: 'O CPF deve conter 11 dígitos.',
    });
    return;
  }

  const phoneRegex = /^\(\d{2}\)\s9\d{4}-\d{4}$/;

  if (!phoneRegex.test(phone.value)) {
    $q.notify({
      type: 'negative',
      message: 'Informe um celular válido. Ex: (85) 91234-5678',
    });
    return;
  }

  const formattedDate = formatDateToISO(dateBirth.value);

  if (!formattedDate) {
    $q.notify({
      type: 'negative',
      message: 'Informe uma data de nascimento válida.',
    });
    return;
  }

  loading.value = true;

  try {
    await register({
      nameCompleted: nameCompleted.value.trim(),
      dateBirth: formattedDate,
      email: email.value.trim().toLowerCase(),
      cpf: cpfFormatted,
      phone: phone.value,
      address: address.value.trim(),
      password: password.value,
    });

    $q.notify({
      type: 'positive',
      message: 'Cadastro realizado com sucesso!',
    });

    await router.replace('/');
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      let message = 'Não foi possível realizar o cadastro.';

      if (status === 409) {
        message = 'Este usuário já está cadastrado.';
      } else if (status === 400) {
        message = 'Verifique os dados informados.';
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

function btnCancel() {
  nameCompleted.value = '';
  dateBirth.value = '';
  email.value = '';
  cpf.value = '';
  phone.value = '';
  address.value = '';
  password.value = '';
  confirmPassword.value = '';
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
