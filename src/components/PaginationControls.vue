<script setup lang="ts">
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const { currentPage, totalPages } = defineProps<{
  currentPage: number;
  totalPages: number;
}>();

defineEmits(['previousPage', 'nextPage']);
</script>

<template>
  <div
    class="flex items-center justify-center mt-8 space-x-2 text-xs font-medium"
  >
    <button
      @click="$emit('previousPage')"
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
      @click="$emit('nextPage')"
      :disabled="currentPage === totalPages"
      type="button"
      class="inline-flex items-center justify-center w-8 h-8 text-gray-900 bg-white border border-gray-100 rounded rtl:rotate-180 disabled:bg-gray-200 disabled:cursor-not-allowed"
    >
      <span class="sr-only">Next Page</span>
      <IconChevronRight size="12" />
    </button>
  </div>
</template>
