<template>
  <q-form class="info">
    <p>{{ name }}</p>
    <q-input
      model-value=""
      class="input"
      :type="type"
      :mask="mask"
      :placeholder="placeholder"
      dense
      outlined
    >
      <template #prepend>
        <q-icon :name="icon" :class="{ 'cursor-pointer': date }">
          <q-popup-proxy v-if="date">
            <q-date model-value="" />
          </q-popup-proxy>
        </q-icon>
      </template>

      <template #append v-if="password">
        <q-icon name="visibility"></q-icon>
      </template>
    </q-input>
  </q-form>
</template>

<script setup lang="ts">
export interface InputForm {
  name: string;
  icon: string;
  mask?: string;
  date?: boolean;
  password?: boolean;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel';
}

withDefaults(defineProps<InputForm>(), {
  icon: '',
  mask: '',
  date: false,
  password: false,
  placeholder: '',
});
</script>

<style scoped>
.info {
  display: flex;
  flex-direction: column;
}

.info p {
  margin-top: 0.35rem;
  margin-bottom: 0.3rem;
  color: var(--text-main);
}

.info .input,
.info .input :deep(.q-field__control) {
  background-color: var(--bg-input);
  border-radius: 1rem;
}
.input :deep(.q-field__control::before),
.input :deep(.q-field__control::after) {
  border-radius: 1rem;
  border: 1px solid var(--border-color);
}
.calendar-icon {
  cursor: pointer;
}
</style>
