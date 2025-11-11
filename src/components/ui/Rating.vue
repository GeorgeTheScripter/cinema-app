<script setup lang="ts">
import { computed } from 'vue';
import StarIcon from './StarIcon.vue';

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
    class="flex items-center justify-center gap-1 min-w-[60px] py-1 px-2 rounded-full font-semibold text-sm"
    :class="[ratingConfig.bg, ratingConfig.text]"
  >
    <div>{{ rating.toFixed(1) }}</div>
    <StarIcon class="w-3 h-3" />
  </div>
</template>
