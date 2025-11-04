<script setup lang="ts">
import Button from 'primevue/button';
import { onMounted, ref } from 'vue';
import { Menubar } from 'primevue';
import { RouterLink, useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { getAuth, onAuthStateChanged, signOut, type Auth } from 'firebase/auth';
import Logo from '@/components/ui/Logo.vue';
import type { NavItem } from '../interfaces/navigation.interface';

const route = useRoute();

const isActive = (menuRoute: string) => {
  return route.path === menuRoute;
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
  <div class="fixed w-full">
    <Menubar>
      <template #start>
        <router-link to="/">
          <Logo />
        </router-link>
      </template>

      <template #end>
        <div class="flex items-center gap-4">
          <RouterLink v-for="item in menuItems" :key="item.title" :to="item.route">
            <Button
              label="Primary"
              severity="secondary"
              :class="{
                'text-primary font-medium': isActive(item.route),
                'text-color': !isActive(item.route),
              }"
              >{{ item.title }}</Button
            >
          </RouterLink>

          <Button @click="handleSignIn" v-if="!isLoggedIn">Вход</Button>
          <Button @click="handleSignOut" v-if="isLoggedIn">Выход</Button>
        </div>
      </template>
    </Menubar>
  </div>
</template>
