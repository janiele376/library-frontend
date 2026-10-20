<template>
  <div class="tenant-dashboard">
    <main class="container-dashboard-content">
      <div class="dashboard-grid">
        <div class="dashboard-col">
          <DashboardBox title="Últimos Livros Alugados">
            <ol class="list-rented-books">
              <li>Nenhum aluguel registrado</li>
            </ol>
          </DashboardBox>

          <DashboardBox title="Situação dos Aluguéis">
            <div class="rental-status">
              <div class="status-item">
                <span>Em dia</span>
                <strong>0</strong>
              </div>

              <div class="status-item">
                <span>Próximos do vencimento</span>
                <strong>0</strong>
              </div>

              <div class="status-item">
                <span>Atrasados</span>
                <strong>0</strong>
              </div>
            </div>
          </DashboardBox>
        </div>

        <div class="dashboard-col">
          <DashboardBox title="Quantidade de Livros Disponíveis">
            <div class="book-quantities">
              <span>Nenhum livro disponível</span>
              <strong>0</strong>
            </div>
          </DashboardBox>

          <DashboardBox title="Livro Mais Alugado">
            <MostRentedBook />
          </DashboardBox>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import DashboardBox from './DashboardBox.vue';
import MostRentedBook from './MostRentedBook.vue';
</script>

<style scoped>
.tenant-dashboard {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 4.5rem);
  background-color: var(--bg-page);
  color: var(--text-main);
}

.container-dashboard-content {
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: start;
  gap: 1.5rem;
}

.dashboard-col {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  min-width: 0;
}

.list-rented-books {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-left: 1.25rem;
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
}

.rental-status {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
  width: 100%;
}

.status-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--border-color);
  font-size: 0.9rem;
}

.status-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.status-item strong {
  font-weight: 600;
}

.book-quantities {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-size: 0.9rem;
}
</style>
