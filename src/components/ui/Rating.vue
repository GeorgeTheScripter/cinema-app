<script setup lang="ts">
import { computed } from 'vue';

const { rating } = defineProps<{
  rating: number;
}>();

const ratingConfig = computed(() => {
  if (rating >= 8) return { bg: 'bg-green-600', text: 'text-white' }; // Отлично
  if (rating >= 7) return { bg: 'bg-green-500', text: 'text-white' }; // Очень хорошо
  if (rating >= 6) return { bg: 'bg-yellow-500', text: 'text-gray-900' }; // Хорошо
  if (rating >= 5) return { bg: 'bg-yellow-400', text: 'text-gray-900' }; // Нормально
  if (rating >= 4) return { bg: 'bg-orange-500', text: 'text-white' }; // Плохо
  return { bg: 'bg-red-500', text: 'text-white' }; // Очень плохо
});
</script>

<template>
  <div
    class="flex gap-1 align-items-center w-fit px-2 py-1 border-round-lg transition-all transition-duration-300 shadow-1"
    :class="[ratingConfig.bg, ratingConfig.text]"
  >
    <div class="font-semibold text-sm">{{ rating.toFixed(1) }}</div>
    <i class="pi pi-star-fill text-xs"></i>
  </div>
</template>
