<script setup lang="ts">
import { computed } from 'vue';
import type { Payment, State } from '@/types/payment';

const props = defineProps<{ payment: Payment }>();

const paymentScheduledDate = computed(() =>
  new Date(props.payment.schedule_date).toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  })
);

const paymentStateColors: Record<State | 'default', string> = {
  paid: 'text-green-600 bg-green-100',
  pending: 'text-amber-600 bg-amber-100',
  default: 'text-gray-600 bg-gray-100',
};
</script>

<template>
  <div class="relative flex flex-col px-4 py-8 text-center bg-white rounded">
    <div
      :class="paymentStateColors[payment.state] || paymentStateColors.default"
      class="absolute inline-flex gap-6 px-2 py-1 rounded right-2 top-2"
    >
      <span class="text-xs font-medium">pending</span>
    </div>

    <dt class="order-last mt-2 text-sm font-medium text-gray-500">
      {{ paymentScheduledDate }}
    </dt>

    <dd class="text-4xl font-extrabold text-gray-700 md:text-5xl">
      ${{ payment.amount }}
    </dd>
  </div>
</template>
