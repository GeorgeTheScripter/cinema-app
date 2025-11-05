<template>
  <component
    :is="tag"
    class="title"
    :class="[`text-${color}`, `text-${align}`, `font-${weight}`, customClass]"
    :style="{ fontSize: computedFontSize }"
  >
    <slot></slot>
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: string; // Размер в rem, например: '2rem', '1.5rem'
  color?: string;
  align?: 'left' | 'center' | 'right';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  customClass?: string;
}

const {
  level = 1,
  size,
  color = 'gray-900',
  align = 'left',
  weight = 'bold',
  marginBottom = 3,
  customClass = '',
} = defineProps<Props>();

const tag = computed(() => `h${level}`);

// Автоматически определяем размер на основе уровня, если явный размер не передан
const computedFontSize = computed(() => {
  if (size) return size;

  const sizeMap = {
    1: '2.5rem',
    2: '2rem',
    3: '2.75rem',
    4: '1.5rem',
    5: '1.25rem',
    6: '1rem',
  };

  return sizeMap[level];
});
</script>

<style scoped>
.title {
  line-height: 1.2;
}
</style>
