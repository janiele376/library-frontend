<template>
  <div class="tenant-dashboard">
    <main class="container-dashboard-content">
      <div v-if="loading" class="dashboard-feedback">
        <q-spinner color="primary" size="2.5rem" />

        <p>{{ t('dashboard.loading') }}</p>
      </div>

      <div v-else-if="error" class="dashboard-feedback">
        <p>{{ t('dashboard.loadError') }}</p>

        <q-btn
          type="button"
          :label="t('dashboard.retry')"
          color="primary"
          no-caps
          unelevated
          @click="loadDashboard"
        />
      </div>

      <div v-else-if="dashboard" class="dashboard-grid">
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

          <DashboardBox :title="t('dashboard.tenant.rentalStatus.title')">
            <div class="rental-status">
              <div class="status-item">
                <span>
                  {{ t('dashboard.tenant.rentalStatus.onTime') }}
                </span>

                <strong>{{ dashboard.onTimeRentals }}</strong>
              </div>

              <div class="status-item">
                <span>
                  {{ t('dashboard.tenant.rentalStatus.nearDue') }}
                </span>

                <strong>{{ dashboard.nearDueRentals }}</strong>
              </div>

              <div class="status-item">
                <span>
                  {{ t('dashboard.tenant.rentalStatus.overdue') }}
                </span>

                <strong>{{ dashboard.overdueRentals }}</strong>
              </div>
            </div>
          </DashboardBox>
        </div>

        <div class="dashboard-col">
          <DashboardBox :title="t('dashboard.tenant.availableBooks.title')">
            <div v-if="dashboard.availableBooks.content.length > 0" class="available-books-list">
              <div
                v-for="book in dashboard.availableBooks.content"
                :key="book.bookId"
                class="book-quantities"
              >
                <span>{{ book.title }}</span>
                <strong>{{ book.quantity }}</strong>
              </div>
            </div>

            <div v-else class="book-quantities">
              <span>
                {{ t('dashboard.tenant.availableBooks.empty') }}
              </span>

              <strong>0</strong>
            </div>

            <div v-if="dashboard.availableBooks.totalPages > 1" class="books-pagination">
              <q-btn
                type="button"
                flat
                dense
                round
                icon="chevron_left"
                :aria-label="t('dashboard.pagination.previous')"
                :disable="currentPage === 0 || loadingBooks"
                @click="changePage(currentPage - 1)"
              />

              <span>
                {{
                  t('dashboard.tenant.availableBooks.pageIndicator', {
                    current: currentPage + 1,
                    total: dashboard.availableBooks.totalPages,
                  })
                }}
              </span>

              <q-btn
                type="button"
                flat
                dense
                round
                icon="chevron_right"
                :aria-label="t('dashboard.pagination.next')"
                :disable="currentPage >= dashboard.availableBooks.totalPages - 1 || loadingBooks"
                @click="changePage(currentPage + 1)"
              />
            </div>
          </DashboardBox>

          <DashboardBox :title="t('dashboard.mostRentedBook.title')">
            <MostRentedBook
              v-if="dashboard.mostRentedBookDetails"
              :title="dashboard.mostRentedBookDetails.title"
              :publisher="dashboard.mostRentedBookDetails.publisher ?? '-'"
              :release-date="
                dashboard.mostRentedBookDetails.releaseDate
                  ? formatDateToBR(dashboard.mostRentedBookDetails.releaseDate)
                  : '-'
              "
              :quantity="dashboard.mostRentedBookDetails.quantity"
            />

            <div v-else class="book-quantities">
              <span>
                {{ dashboard.mostRentedBook ?? t('dashboard.lastRentals.empty') }}
              </span>
            </div>
          </DashboardBox>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Notify } from 'quasar';
import { formatDateToBR } from '@/utils/dateUtils.js';

import DashboardBox from './DashboardBox.vue';
import MostRentedBook from './MostRentedBook.vue';

import { getUserDashboard } from '@/services/dashboardService';
import type { UserDashboardResponse } from '@/types/dashboard';

const { t } = useI18n({ useScope: 'global' });

const dashboard = ref<UserDashboardResponse | null>(null);

const loading = ref(false);
const loadingBooks = ref(false);
const error = ref<string | null>(null);

const currentPage = ref(0);
const pageSize = 5;

async function loadDashboard(): Promise<void> {
  loading.value = true;
  error.value = null;

  try {
    const response = await getUserDashboard({
      page: currentPage.value,
      size: pageSize,
    });

    dashboard.value = response;
    currentPage.value = response.availableBooks.number;
  } catch (err) {
    console.error('Erro ao carregar Dashboard do usuário:', err);

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

async function changePage(page: number): Promise<void> {
  if (
    !dashboard.value ||
    page < 0 ||
    page >= dashboard.value.availableBooks.totalPages ||
    loadingBooks.value
  ) {
    return;
  }

  loadingBooks.value = true;

  try {
    const response = await getUserDashboard({
      page,
      size: pageSize,
    });

    dashboard.value = response;
    currentPage.value = response.availableBooks.number;
  } catch (err) {
    console.error('Erro ao carregar página de livros:', err);

    Notify.create({
      type: 'negative',
      message: t('dashboard.tenant.availableBooks.loadError'),
    });
  } finally {
    loadingBooks.value = false;
  }
}

onMounted(() => {
  void loadDashboard();
});
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

.book-quantities span {
  min-width: 0;
  overflow-wrap: anywhere;
}

.available-books-list {
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.available-books-list .book-quantities {
  padding-bottom: 0.65rem;
  border-bottom: 1px solid var(--border-color);
}

.available-books-list .book-quantities:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.books-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.75rem;
  margin-top: 1rem;
  color: var(--text-main);
  font-size: 0.85rem;
}

.dashboard-feedback {
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
