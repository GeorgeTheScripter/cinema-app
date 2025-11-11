<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut, type Auth } from 'firebase/auth';
import Logo from '@/components/ui/Logo.vue';
import type { NavItem } from '@/components/layout/header';
import Button from '@/components/ui/Button.vue';
// Предполагается, что LinkButton импортирован из компонента, который вы стилизовали ранее
import LinkButton from '@/components/ui/LinkButton.vue'; // Добавил явный импорт LinkButton

const route = useRoute();

const isActive = (menuRoute: string) => {
  return route.path === menuRoute;
};

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

const isLoggedIn = ref<boolean>(false);
const router = useRouter();

let auth: Auth;

onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = user ? true : false;
  });
});

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/login');
  });
};

const handleSignIn = () => {
  router.push('/login');
};
</script>

<template>
  <div class="fixed w-full z-20 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
    <header class="flex justify-between items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <router-link to="/">
        <Logo />
      </router-link>

      <div class="flex items-center gap-4">
        <RouterLink v-for="item in menuItems" :key="item.title" :to="item.route">
          <LinkButton
            :class="{
              'text-blue-500': isActive(item.route),
              'text-white': !isActive(item.route),
            }"
            >{{ item.title }}</LinkButton
          >
        </RouterLink>

        <Button @click="handleSignIn" v-if="!isLoggedIn" class="bg-blue-600 hover:bg-blue-700"
          >Вход</Button
        >
        <Button @click="handleSignOut" v-if="isLoggedIn" class="bg-red-600 hover:bg-red-700"
          >Выход</Button
        >
      </div>
    </header>
  </div>
</template>
