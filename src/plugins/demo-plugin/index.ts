import type { App } from 'vue';
import { vFocus } from './directives/v-focus';
import GlobalCard from './ui/GlobalCard.vue';

const demoPlugin = {
  install(app: App<Element>, options) {
    // configure the app

    app.component('global-card', GlobalCard);

    //app.directive('v-focus', vFocus);
    app.provide('key', 'value');
    //app.provide('demoPlugin', options);
  },
};

export default demoPlugin;
