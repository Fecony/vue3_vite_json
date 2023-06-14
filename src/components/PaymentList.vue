<script setup lang="ts">
import PaymentItem from '@components/PaymentItem.vue';
import { Payment } from '@/types/payment';

const { payments } = defineProps<{ payments: Payment[] }>();
</script>

<template>
  <dl class="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-3">
    <PaymentItem v-for="payment in payments" :payment="payment" />
  </dl>
</template>
