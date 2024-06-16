import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/globals.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import router from './router/index';
import store from './store/index';

createApp(App)
  .use(router)
  .use(store)
  .mount('#app')
