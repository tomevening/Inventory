import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from './App.vue';
// import router from './router';
import './style.scss';

const pinia = createPinia();

// createApp(App).use(pinia).use(router).mount('#app');
createApp(App).use(pinia).mount('#app');
