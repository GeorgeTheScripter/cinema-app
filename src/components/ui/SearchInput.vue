<script setup lang="ts">
import SearchIcon from './SearchIcon.vue';

const props = defineProps<{
  modelValue: string;
  placeholder: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const handleInput = (event: Event) => {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
};
</script>

<template>
  <div class="relative w-full max-w-sm">
    <input
      @input="handleInput"
      type="text"
      class="w-full bg-gray-800 text-white border border-gray-700 rounded-xl py-3 pl-12 pr-4 shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-gray-600 placeholder-gray-400"
      :placeholder="props.placeholder"
    />
    <SearchIcon />
  </div>
</template>
