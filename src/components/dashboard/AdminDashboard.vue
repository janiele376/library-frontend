<template>
  <div class="admin-dashboard">
    <DashboardSidebar />

    <section class="container-dashboard-content">
      <div v-if="loading" class="dashboard-feedback">
        <q-spinner color="primary" size="2.5rem" />
        <p>{{ t('dashboard.loading') }}</p>
      </div>

      <div v-else-if="error" class="dashboard-feedback">
        <p>{{ t('dashboard.loadError') }}</p>

        <q-btn
          :label="t('dashboard.retry')"
          color="primary"
          no-caps
          unelevated
          @click="loadDashboard"
        />
      </div>

      <template v-else-if="dashboard">
        <DashboardStatusCards
          :on-time="dashboard.onTimeRentals"
          :expiring="dashboard.nearDueRentals"
          :late="dashboard.overdueRentals"
        />

        <div class="dashboard-grid">
          <div class="dashboard-col">
            <DashboardBox :title="t('dashboard.lastRentals.title')">
              <ol v-if="dashboard.lastRentals.length > 0" class="list-rented-books">
                <li v-for="rental in dashboard.lastRentals" :key="rental.rentalId">
                  {{ rental.title }}
                </li>
              </ol>

              <ol v-else class="list-rented-books">
                <li>{{ t('dashboard.lastRentals.empty') }}</li>
              </ol>
            </DashboardBox>

            <DashboardBox :title="t('dashboard.globalStats.title')">
              <DashboardGlobalStats
                :rentals="dashboard.totalRentals"
                :books="dashboard.totalBooks"
                :publishers="dashboard.totalPublishers"
              />
            </DashboardBox>
          </div>

          <div class="dashboard-col">
            <DashboardBox :title="t('dashboard.rentalQuantities.title')">
              <DashboardCarousel :rentals="dashboard.activeRentalsByBook" />
            </DashboardBox>

            <DashboardBox :title="t('dashboard.mostRentedBook.title')">
              <MostRentedBook
                :title="dashboard.mostRentedBook?.title ?? '-'"
                :publisher="dashboard.mostRentedBook?.publisher ?? '-'"
                :release-date="formatReleaseDate(dashboard.mostRentedBook?.releaseDate)"
                :quantity="dashboard.mostRentedBook?.quantity ?? 0"
              />
            </DashboardBox>
          </div>
        </div>
      </template>
    </section>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Notify } from 'quasar';

import DashboardSidebar from './DashboardSidebar.vue';
import DashboardStatusCards from './DashboardStatusCards.vue';
import DashboardBox from './DashboardBox.vue';
import DashboardGlobalStats from './DashboardGlobalStats.vue';
import DashboardCarousel from './DashboardCarousel.vue';
import MostRentedBook from './MostRentedBook.vue';

import { getAdminDashboard } from '@/services/dashboardService';
import type { AdminDashboardResponse } from '@/types/dashboard';
import { formatDateToBR } from '@/utils/dateUtils';

const { t } = useI18n({ useScope: 'global' });

const dashboard = ref<AdminDashboardResponse | null>(null);

const loading = ref(false);
const error = ref<string | null>(null);

function formatReleaseDate(value: string | null | undefined): string {
  return value ? formatDateToBR(value) : '-';
}

async function loadDashboard(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    dashboard.value = await getAdminDashboard();
  } catch (err) {
    console.error('Erro ao carregar Dashboard administrativa:', err);

    dashboard.value = null;
    error.value = t('dashboard.loadError');

    Notify.create({
      type: 'negative',
      message: t('dashboard.loadError'),
    });
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  void loadDashboard();
});
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

.dashboard-feedback {
  flex: 1;
  min-height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  text-align: center;
}

.dashboard-feedback p {
  margin: 0;
  color: var(--text-main);
}
</style>
