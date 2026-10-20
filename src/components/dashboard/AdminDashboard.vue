<template>
  <div class="admin-dashboard">
    <DashboardSidebar />

    <section class="container-dashboard-content">
      <DashboardStatusCards
        :on-time="dashboard?.onTimeRentals ?? 0"
        :expiring="dashboard?.nearDueRentals ?? 0"
        :late="dashboard?.overdueRentals ?? 0"
      />

      <div class="dashboard-grid">
        <div class="dashboard-col">
          <DashboardBox title="Últimos Livros Alugados">
            <ol v-if="dashboard?.lastRentals?.length" class="list-rented-books">
              <li v-for="rental in dashboard.lastRentals" :key="rental.rentalId">
                {{ rental.title }}
              </li>
            </ol>

            <ol v-else class="list-rented-books">
              <li>Nenhum aluguel registrado</li>
            </ol>
          </DashboardBox>

          <DashboardBox title="Quantitativos Globais">
            <DashboardGlobalStats
              :rentals="dashboard?.totalRentals ?? 0"
              :books="dashboard?.totalBooks ?? 0"
              :publishers="dashboard?.totalPublishers ?? 0"
            />
          </DashboardBox>
        </div>

        <div class="dashboard-col">
          <DashboardBox title="Quantidade de Livros Alugados">
            <DashboardCarousel :rentals="dashboard?.activeRentalsByBook ?? {}" />
          </DashboardBox>

          <DashboardBox title="Livro Mais Alugado">
            <MostRentedBook
              :title="dashboard?.mostRentedBook?.title ?? '-'"
              :publisher="dashboard?.mostRentedBook?.publisher ?? '-'"
              :release-date="dashboard?.mostRentedBook?.releaseDate ?? '-'"
              :quantity="dashboard?.mostRentedBook?.quantity ?? 0"
            />
          </DashboardBox>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Notify } from 'quasar';

import DashboardSidebar from './DashboardSidebar.vue';
import DashboardStatusCards from './DashboardStatusCards.vue';
import DashboardBox from './DashboardBox.vue';
import DashboardGlobalStats from './DashboardGlobalStats.vue';
import DashboardCarousel from './DashboardCarousel.vue';
import MostRentedBook from './MostRentedBook.vue';

import { getAdminDashboard } from '../../services/dashboardService';
import type { AdminDashboardResponse } from '../../types/dashboard';

const dashboard = ref<AdminDashboardResponse | null>(null);

async function loadDashboard() {
  try {
    dashboard.value = await getAdminDashboard();
  } catch {
    Notify.create({
      type: 'negative',
      message: 'Erro ao carregar os dados da Dashboard.',
    });
  }
}

onMounted(loadDashboard);
</script>

<style scoped>
.admin-dashboard {
  display: flex;
  width: 100%;
  min-height: calc(100vh - 4.5rem);
  background-color: var(--bg-page);
  color: var(--text-main);
}

.container-dashboard-content {
  flex: 1;
  min-width: 0;
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr);
  align-items: start;
  gap: 1.5rem;
  width: 100%;
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
</style>
