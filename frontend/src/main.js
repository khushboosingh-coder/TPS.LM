import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router/index.js';
import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './assets/styles/main.css';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
