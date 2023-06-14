<script setup lang="ts">
import {
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from '@tabler/icons-vue';
import { Payment } from '@/types/payment';

const { sortFields, modelValue, isAscendingOrder } = defineProps<{
  sortFields: Record<keyof Payment, string>;
  modelValue: string;
  isAscendingOrder: boolean;
}>();

const emit = defineEmits<{
  'update:modelValue': [modelValue: string];
}>();

const updateSortBy = (event: any) => {
  emit('update:modelValue', event.target.value);
};
</script>

<template>
  <div class="flex justify-end mt-8">
    <div class="flex space-x-2">
      <label for="sortBy" class="sr-only">Sort By</label>

      <select
        id="sortBy"
        class="h-10 text-sm border-gray-300 rounded"
        :value="modelValue"
        @input="updateSortBy"
      >
        <option disabled value="">Sort By</option>

        <option v-for="(value, key) in sortFields" :value="key">
          {{ value }}
        </option>
      </select>

      <button
        type="button"
        :disabled="modelValue == ''"
        class="inline-flex items-center justify-center flex-shrink-0 w-10 h-10 gap-2 font-medium text-gray-700 align-middle transition-all bg-white border rounded-md shadow-sm disabled:bg-gray-200 disabled:cursor-not-allowed hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white"
        @click.prevent="$emit('toggleSortOrder')"
      >
        <span class="sr-only">Sort in Ascending order...</span>
        <IconSortAscendingLetters v-if="isAscendingOrder" />
        <IconSortDescendingLetters v-else />
      </button>
    </div>
  </div>
</template>
