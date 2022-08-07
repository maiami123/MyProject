import { createApp } from 'vue';
import App from './App.vue';
import './common/base.css';
import router from './router/index';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import store from './store/index.js'
const app = createApp(App);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
app.use(router);
app.use(ElementPlus);
app.use(store);
app.mount('#app');
