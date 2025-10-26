import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/shared/lib/prime-vue/primeflex.css';
import '@/shared/styles/index.css';
import { initializeApp } from 'firebase/app';
import 'primeicons/primeicons.css';
import App from '@/app/App.vue';
import router from '@/app/router';
import { PrimeVue, primeVueConfig } from '@/shared/lib/prime-vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, primeVueConfig);

const firebaseConfig = {
  apiKey: 'AIzaSyAQ51j2ey6Kc78yrwWTBa6GuVns__tBb3M',
  authDomain: 'cinema-app-690f7.firebaseapp.com',
  projectId: 'cinema-app-690f7',
  storageBucket: 'cinema-app-690f7.firebasestorage.app',
  messagingSenderId: '924056986827',
  appId: '1:924056986827:web:69d46eb59b13e81f7b274e',
};

initializeApp(firebaseConfig);

app.mount('#app');
