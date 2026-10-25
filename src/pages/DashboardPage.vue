<template>
  <AdminDashboard v-if="isAdmin" />
  <TenantDashboard v-else />
</template>

<script setup lang="ts">
import AdminDashboard from '../components/dashboard/AdminDashboard.vue';
import TenantDashboard from '../components/dashboard/TenantDashboard.vue';
import { decodeToken } from '@/utils/tokenUtils';

const token = sessionStorage.getItem('token');
const payload = token ? decodeToken(token) : null;

const isAdmin = payload?.isAdmin === true;
</script>
