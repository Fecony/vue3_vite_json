<script setup lang="ts">
import { computed, ref } from 'vue';
import data from './data/amortization_payments.json';
import SortControls from '@components/SortControls.vue';
import PaymentList from '@components/PaymentList.vue';
import PaginationControls from '@components/PaginationControls.vue';
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

const startItemIndex = computed(() => (currentPage.value - 1) * itemsPerPage);
const endItemIndex = computed(() => startItemIndex.value + itemsPerPage);
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

      <SortControls
        :sortFields="sortFields"
        v-model="sortByField"
        :isAscendingOrder="isAscendingOrder"
        @toggleSortOrder="toggleSortOrder"
      />

      <PaymentList :payments="paginatedData" />

      <PaginationControls
        :currentPage="currentPage"
        :totalPages="totalPages"
        @previousPage="previousPage"
        @nextPage="nextPage"
      />
    </div>
  </section>
</template>
