<script setup lang="ts">
import { InputText } from 'primevue';

const { type } = defineProps<{ type: string }>();
</script>

<template>
  <InputText :type="type" />
</template>

<style scoped></style>
