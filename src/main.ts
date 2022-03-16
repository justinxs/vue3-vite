import { createApp } from 'vue';
import { createPinia } from 'pinia';
import '@/style/base.scss';
import '@/style/theme.scss';
import App from './App.vue';
import router from './routes';
import "@/utils/extend";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
