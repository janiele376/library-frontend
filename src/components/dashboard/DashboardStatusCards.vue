<template>
  <div class="container-status-cards">
    <div class="card-status card-green">
      <p class="card-title">Quantidade de Aluguéis em Dia:</p>
      <h3 class="card-value">{{ onTime }} Aluguéis</h3>
    </div>

    <div class="card-status card-yellow">
      <p class="card-title">Quantidade de Aluguéis Perto de Vencer:</p>
      <h3 class="card-value">{{ expiring }} Aluguéis</h3>
    </div>

    <div class="card-status card-red">
      <p class="card-title">Quantidade de Aluguéis em Atraso:</p>
      <h3 class="card-value">{{ late }} Aluguéis</h3>
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    onTime?: number;
    expiring?: number;
    late?: number;
  }>(),
  {
    onTime: 0,
    expiring: 0,
    late: 0,
  },
);
</script>

<style scoped>
.container-status-cards {
  width: 100%;
  display: flex;
  gap: 1.5rem;
}

.card-status {
  flex: 1;
  min-height: 6rem;
  padding: 1rem 1.2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.4rem;
}

.card-green {
  background-color: #d8f8e1;
  color: #2e7d32;
}

.card-yellow {
  background-color: #fff4d4;
  color: #e67e22;
}

.card-red {
  background-color: #fcd8d8;
  color: #c0392b;
}

:global(body.dark-mode) .card-green {
  background-color: rgba(46, 125, 50, 0.25);
  color: #81c784;
}

:global(body.dark-mode) .card-yellow {
  background-color: rgba(230, 126, 34, 0.25);
  color: #ffb74d;
}

:global(body.dark-mode) .card-red {
  background-color: rgba(192, 57, 43, 0.25);
  color: #e57373;
}

.card-title {
  font-size: 0.85rem;
  font-weight: 600;
}

.card-value {
  font-size: 1.35rem;
  font-weight: bold;
}
</style>
