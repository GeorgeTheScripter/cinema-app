<script setup lang="ts">
import { RouterView } from 'vue-router';
import PrimeHeader from '@/shared/ui/PrimeHeader.vue';
</script>

<template>
  <PrimeHeader />
  <div class="my-0 mx-auto md:w-11 lg:w-9">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
