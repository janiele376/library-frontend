<template>
  <div class="dashboard-carousel">
    <div class="list-quantities">
      <div v-for="item in visibleItems" :key="item.bookId" class="item-qty">
        <span>
          {{
            bookTitles[item.bookId] ??
            t('dashboard.rentalQuantities.bookFallback', {
              id: item.bookId,
            })
          }}
        </span>

        <span>
          {{ t('dashboard.rentalQuantities.quantity') }}
          {{ item.quantity }}
        </span>
      </div>

      <div v-if="items.length === 0" class="item-qty">
        <span>
          {{ t('dashboard.rentalQuantities.empty') }}
        </span>

        <span> {{ t('dashboard.rentalQuantities.quantity') }} 0 </span>
      </div>
    </div>

    <div v-if="totalPages > 1" class="carousel-dots">
      <button
        type="button"
        class="carousel-arrow"
        :disabled="currentPage === 0"
        :aria-label="t('dashboard.rentalQuantities.previousPage')"
        @click="previousPage"
      >
        &lt;
      </button>

      <div class="dots">
        <button
          v-for="page in totalPages"
          :key="page"
          type="button"
          class="dot"
          :class="{ active: currentPage === page - 1 }"
          :aria-label="
            t('dashboard.rentalQuantities.goToPage', {
              page,
            })
          "
          :aria-current="currentPage === page - 1 ? 'page' : undefined"
          @click="currentPage = page - 1"
        />
      </div>

      <button
        type="button"
        class="carousel-arrow"
        :disabled="currentPage === totalPages - 1"
        :aria-label="t('dashboard.rentalQuantities.nextPage')"
        @click="nextPage"
      >
        &gt;
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { getBookById } from '@/services/bookService';

interface CarouselItem {
  bookId: string;
  quantity: number;
}

const props = defineProps<{
  rentals: Record<string, number>;
}>();

const { t } = useI18n({ useScope: 'global' });

const currentPage = ref(0);
const itemsPerPage = 3;

const bookTitles = ref<Record<string, string>>({});

const items = computed<CarouselItem[]>(() =>
  Object.entries(props.rentals).map(([bookId, quantity]) => ({
    bookId,
    quantity,
  })),
);

const totalPages = computed(() => Math.max(1, Math.ceil(items.value.length / itemsPerPage)));

const visibleItems = computed(() => {
  const start = currentPage.value * itemsPerPage;

  return items.value.slice(start, start + itemsPerPage);
});

async function loadBookTitles(): Promise<void> {
  const bookIds = Object.keys(props.rentals);

  const missingIds = bookIds.filter((bookId) => bookTitles.value[bookId] === undefined);

  await Promise.all(
    missingIds.map(async (bookId) => {
      try {
        const book = await getBookById(Number(bookId));

        bookTitles.value[bookId] = book.title;
      } catch (error) {
        console.error(`Erro ao buscar o título do livro ${bookId}:`, error);
      }
    }),
  );
}

function nextPage(): void {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
  }
}

function previousPage(): void {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
}

watch(
  () => props.rentals,
  () => {
    currentPage.value = 0;

    void loadBookTitles();
  },
  { immediate: true },
);

watch(totalPages, (pages) => {
  if (currentPage.value >= pages) {
    currentPage.value = pages - 1;
  }
});
</script>

<style scoped>
.dashboard-carousel {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list-quantities {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
}

.item-qty {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  width: 100%;
  font-size: 0.9rem;
  line-height: 1.5;
}

.item-qty span:last-child {
  flex-shrink: 0;
  font-weight: 600;
}

.carousel-dots {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 1rem;
  color: var(--text-main);
}

.carousel-arrow {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  padding: 0.25rem 0.5rem;
}

.carousel-arrow:disabled {
  opacity: 0.35;
  cursor: not-allowed;
}

.dots {
  display: flex;
  align-items: center;
  gap: 0.4rem;
}

.dot {
  width: 0.45rem;
  height: 0.45rem;
  border: none;
  border-radius: 50%;
  background-color: var(--border-color);
  padding: 0;
  cursor: pointer;
}

.dot.active {
  background-color: var(--text-main);
}
</style>
