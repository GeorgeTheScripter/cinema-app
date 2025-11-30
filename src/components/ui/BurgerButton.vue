<template>
  <button @click="onHandleUpdate" id="burgerButton" class="relative w-12 h-12 focus:outline-none">
    <span
      class="absolute top-4 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white transition-all duration-300"
      :class="{
        'rotate-45 top-5 translate-y-1': props.modelValue,
      }"
    ></span>
    <span
      class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-white transition-all duration-300"
      :class="{
        'opacity-0': props.modelValue,
      }"
    ></span>
    <span
      class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-white transition-all duration-300"
      :class="{
        '-rotate-45 top-7 -translate-y-1': props.modelValue,
      }"
    ></span>
  </button>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: boolean;
}>();

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

const onHandleUpdate = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<style scoped></style>
