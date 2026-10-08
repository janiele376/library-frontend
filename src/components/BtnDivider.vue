<template>
  <div class="btns">
    <q-btn type="button" class="btn-confirmar" name="btn-confirmar" :to="path_confirm">
      {{ name_confirm }}</q-btn
    >

    <div class="divider">
      <span></span>

      <p>ou</p>

      <span></span>
    </div>

    <q-btn type="button" class="btn-cancel" name="btn-cancel" :to="path_cancel">
      {{ name_cancel }}
    </q-btn>
  </div>
</template>

<script setup lang="ts">
export interface BtnDivider {
  name_confirm?: string;
  name_cancel?: string;
  path_confirm?: string;
  path_cancel?: string;
}

withDefaults(defineProps<BtnDivider>(), {
  name_confirm: '',
  name_cancel: '',
});
</script>

<style scoped>
.btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  margin-top: 1.5rem;
}

.btn-confirmar,
.btn-cancel {
  width: 17rem;
  height: 2rem;
  border-radius: 0.625rem;
  font-weight: bold;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-confirmar {
  border: 2px solid var(--btn-primary-border);
  background-color: var(--btn-primary-bg);
  color: var(--btn-primary-text);
}

.btn-cancel {
  border: 2px solid var(--border-color);
  background-color: var(--btn-secondary-bg);
  color: var(--btn-secondary-text);
}

.btn-confirmar:hover,
.btn-cancel:hover {
  opacity: 0.8;
}

.divider {
  width: 17rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.divider span {
  flex: 1;
  height: 1px;
  background-color: var(--text-main);
}

.divider p {
  color: var(--text-main);
  font-size: 0.8rem;
}
</style>
