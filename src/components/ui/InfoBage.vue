<script setup lang="ts">
const { title } = defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="flex flex-wrap">
    <div>
      <strong class="text-gray-400">{{ title }}:</strong>
    </div>

    <slot name="descr"></slot>
  </div>
</template>
