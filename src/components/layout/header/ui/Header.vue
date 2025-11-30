<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import Logo from '@/components/ui/Logo.vue';
import Button from '@/components/ui/Button.vue';
import { auth } from '@/service/firebase/config';
import BurgerButton from '@/components/ui/BurgerButton.vue';
import LinkItems from './LinkItems.vue';
import BurgerMenu from './BurgerMenu.vue';

const isLoggedIn = ref<boolean>(false);

onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    isLoggedIn.value = user ? true : false;
  });
});

const router = useRouter();
const isOpen = ref<boolean>(false);

const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push('/login');
  });
  isOpen.value = false;
};

const handleSignIn = () => {
  router.push('/login');
  isOpen.value = false;
};

const route = useRoute();

watch(route, () => {
  isOpen.value = false;
});
</script>

<template>
  <div class="fixed w-full z-20 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700">
    <header
      class="flex justify-between text-white items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
    >
      <router-link to="/">
        <Logo />
      </router-link>

      <div class="hidden sm:flex items-center gap-8">
        <div class="flex gap-6">
          <LinkItems />
        </div>

        <Button @click="handleSignIn" v-if="!isLoggedIn" class="bg-blue-600 hover:bg-blue-700"
          >Вход</Button
        >
        <Button @click="handleSignOut" v-if="isLoggedIn" class="bg-red-600 hover:bg-red-700"
          >Выход</Button
        >
      </div>

      <BurgerButton v-model="isOpen" class="sm:hidden" />
    </header>

    <BurgerMenu
      v-if="isOpen"
      :isLoggedIn="isLoggedIn"
      class="sm:hidden"
      @signIn="handleSignIn"
      @signOut="handleSignOut"
    />
  </div>
</template>
