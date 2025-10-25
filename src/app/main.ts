import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/shared/lib/prime-vue/primeflex.css';
import '@/shared/styles/index.css';

import 'primeicons/primeicons.css';
import App from '@/app/App.vue';
import router from '@/app/router';
import { PrimeVue, primeVueConfig } from '@/shared/lib/prime-vue';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, primeVueConfig);

app.mount('#app');
