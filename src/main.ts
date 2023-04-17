import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import router from './router'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import ArcoVue from '@arco-design/web-vue';
import ArcoVueIcon from '@arco-design/web-vue/es/icon';
import '@arco-design/web-vue/dist/arco.css';
import { Notification } from '@arco-design/web-vue';
import 'bootstrap/dist/css/bootstrap.min.css';



const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
// app.use(ElementPlus)
app.use(ArcoVue).use(ArcoVueIcon);
Notification._context = app._context;

app.mount('#app')
