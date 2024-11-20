import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeicons/primeicons.css';
import App from './App.vue';
import { plugin, defaultConfig } from '@formkit/vue';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import { VueQueryPlugin } from '@tanstack/vue-query';
import router from './pages/router';
import demoPlugin from './plugins/demo-plugin';

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(plugin, defaultConfig);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

/*app.use(demoPlugin, {
  theme: 'dark',
  piniaInstance: pinia,
});*/
app.use(VueQueryPlugin);

app.mount('#app');
