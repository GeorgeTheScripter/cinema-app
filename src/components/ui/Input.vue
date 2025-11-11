<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  placeholder: string;
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<template>
  <input
    :placeholder="props.placeholder"
    type="text"
    :value="props.modelValue"
    class="w-full py-3 px-4 text-gray-800 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400 active:bg-gray-100 placeholder:text-gray-500 rounded-lg focus:border-blue-600 outline-none transition-colors"
    @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
  />
</template>
