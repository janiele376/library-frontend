<template>
  <q-page class="q-pa-lg">
    <h4>
      {{ isAdmin ? 'Dashboard Administrativo' : 'Dashboard do Locatário' }}
    </h4>

    <p v-if="isAdmin">Bem-vindo, administrador!</p>

    <p v-else>Bem-vindo ao sistema de biblioteca!</p>
  </q-page>
</template>

<script setup lang="ts">
import { decodeToken, isTokenExpired } from '@/utils/tokenUtils';

const token = sessionStorage.getItem('token');

const payload = token && !isTokenExpired(token) ? decodeToken(token) : null;

const isAdmin = payload?.isAdmin === true;
</script>
