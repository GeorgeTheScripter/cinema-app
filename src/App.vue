<script setup lang="ts">
import { Header } from '@/components/layout/header';
import { RouterView } from 'vue-router';
import { Footer } from './components/layout/footer';
</script>

<template>
  <Header />
  <div class="">
    <RouterView></RouterView>
  </div>
  <Footer />
</template>

<style scoped>
.pt-100px {
  padding-top: 100px;
}
</style>
