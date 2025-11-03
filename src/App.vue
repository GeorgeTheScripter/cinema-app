<script setup lang="ts">
import PrimeHeader from '@/components/layout/PrimeHeader.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <PrimeHeader />
  <div class="my-0 mx-auto md:w-11 lg:w-9">
    <RouterView></RouterView>
  </div>
</template>

<style scoped></style>
