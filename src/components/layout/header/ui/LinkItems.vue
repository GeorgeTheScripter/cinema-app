<script setup lang="ts">
import { ref } from 'vue';
import type { NavItem } from '../interfaces/Navigation.interface';
import LinkButton from '@/components/ui/LinkButton.vue';

const menuItems = ref<NavItem[]>([
  {
    title: 'Главная',
    route: '/',
  },
  {
    title: 'Поиск',
    route: '/search',
  },
  {
    title: 'Избранное',
    route: '/favorites',
  },
]);
</script>

<template>
  <RouterLink v-for="item in menuItems" :key="item.title" :to="item.route">
    <LinkButton>{{ item.title }}</LinkButton>
  </RouterLink>
</template>

<style scoped></style>
