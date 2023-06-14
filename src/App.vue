<script setup lang="ts">
import { computed, ref } from 'vue';
import data from './data/amortization_payments.json';

import {
  IconSortAscendingLetters,
  IconSortDescendingLetters,
  IconChevronRight,
  IconChevronLeft,
} from '@tabler/icons-vue';
import PaymentList from './components/PaymentList.vue';
import PaymentItem from './components/PaymentItem.vue';
import { Payment } from './types/payment';

const itemsPerPage = 9;
const sortFields = {
  schedule_date: 'Schedule Date',
  state: 'State',
  amount: 'Amount',
  project_id: 'Project ID',
};

const sortByField = ref('');
const isAscendingOrder = ref(true);

const currentPage = ref(1);
const totalItems = ref(data.length);

const startItemIndex = computed(() => {
  return (currentPage.value - 1) * itemsPerPage;
});

const endItemIndex = computed(() => {
  return startItemIndex.value + itemsPerPage;
});

const totalPages = computed(() => Math.ceil(totalItems.value / itemsPerPage));

const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const toggleSortOrder = () => {
  isAscendingOrder.value = !isAscendingOrder.value;
};

const amortizationList = computed(() => {
  if (!sortByField.value) return data;

  const sortBy = sortByField.value as keyof Payment;
  const isAscending = isAscendingOrder.value;

  return data.sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];

    if (aValue < bValue) return isAscending ? -1 : 1;
    if (aValue > bValue) return isAscending ? 1 : -1;

    return 0;
  });
});

const paginatedData = computed(() => {
  return amortizationList.value.slice(startItemIndex.value, endItemIndex.value);
});
</script>

<template>
  <section>
    <div class="max-w-screen-xl px-4 py-8 mx-auto sm:px-6 sm:py-12 lg:px-8">
      <header class="text-center">
        <h2 class="text-xl font-bold text-gray-900 sm:text-3xl">
          Amortization List
        </h2>

        <p class="max-w-md mx-auto mt-4 text-gray-500">
          Vue.js project to display a list of amortizations
        </p>
      </header>

      <div class="flex justify-end mt-8">
        <div class="flex space-x-2">
          <label for="sortBy" class="sr-only">Sort By</label>

          <select
            id="sortBy"
            class="h-10 text-sm border-gray-300 rounded"
            v-model="sortByField"
          >
            <option disabled value="">Sort By</option>

            <option v-for="(value, key) in sortFields" :value="key">
              {{ value }}
            </option>
          </select>

          <button
            type="button"
            class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 gap-2 font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
            @click.prevent="toggleSortOrder"
          >
            <span class="sr-only">Sort in Ascending order...</span>
            <IconSortAscendingLetters v-if="isAscendingOrder" />
            <IconSortDescendingLetters v-else />
          </button>
        </div>
      </div>

      <PaymentList>
        <PaymentItem v-for="payment in paginatedData" :payment="payment" />
      </PaymentList>

      <div
        class="flex items-center justify-center mt-8 space-x-2 text-xs font-medium"
      >
        <button
          @click="previousPage"
          :disabled="currentPage === 1"
          type="button"
          class="inline-flex items-center justify-center w-8 h-8 text-gray-900 bg-white border border-gray-100 rounded disabled:bg-gray-200 disabled:cursor-not-allowed rtl:rotate-180"
        >
          <span class="sr-only">Prev Page</span>
          <IconChevronLeft size="12" />
        </button>

        <p class="text-xs text-gray-900">
          {{ currentPage }}
          <span class="mx-0.25">/</span>
          {{ totalPages }}
        </p>

        <button
          @click="nextPage"
          :disabled="currentPage === totalPages"
          type="button"
          class="inline-flex items-center justify-center w-8 h-8 text-gray-900 bg-white border border-gray-100 rounded rtl:rotate-180 disabled:bg-gray-200 disabled:cursor-not-allowed"
        >
          <span class="sr-only">Next Page</span>
          <IconChevronRight size="12" />
        </button>
      </div>
    </div>
  </section>
</template>
