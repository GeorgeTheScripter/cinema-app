<template>
  <div class="card">
    <Menubar class="">
      <template #start>
        <router-link to="/">
          <Logo />
        </router-link>
      </template>

      <template #end>
        <div class="flex items-center gap-4">
          <Button v-for="item in menuItems" :key="item.title" label="Primary" severity="secondary">
            <RouterLink
              :to="item.route"
              :class="{
                'text-primary font-medium': isActive(item.route),
                'text-color': !isActive(item.route),
              }"
              >{{ item.title }}</RouterLink
            >
          </Button>
        </div>
      </template>
    </Menubar>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import { Menubar } from 'primevue';
import { RouterLink } from 'vue-router';
import { useRoute } from 'vue-router';
import Logo from './Logo.vue';

const route = useRoute();

const isActive = (menuRoute: string) => {
  return route.path === menuRoute;
};

type NavItem = {
  title: string;
  icon: string;
  route: string;
};

const menuItems = ref<NavItem[]>([
  {
    title: 'Главная',
    icon: 'pi pi-home',
    route: '/',
  },
  {
    title: 'Поиск',
    icon: 'pi pi-search',
    route: '/search',
  },
  {
    title: 'Избранное',
    icon: 'pi pi-heart',
    route: '/favorites',
  },
  {
    title: 'Регистрация',
    icon: 'pi pi-heart',
    route: '/register',
  },
  {
    title: 'Вход',
    icon: 'pi pi-heart',
    route: '/login',
  },
]);
</script>
