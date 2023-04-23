import { createApp } from 'vue';
import { Dialog, Notify, Quasar } from 'quasar';
import App from './App.vue';
import store from './store';
import router from './router';
import 'quasar/src/css/index.sass';
import '@quasar/extras/line-awesome/line-awesome.css';

createApp(App)
  .use(Quasar, { plugins: { Dialog, Notify } })
  .use(store)
  .use(router)
  .mount('#app');
