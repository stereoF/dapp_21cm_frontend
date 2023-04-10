import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import ArcoVue from '@arco-design/web-vue';
import '@arco-design/web-vue/dist/arco.css';
import { Notification } from '@arco-design/web-vue';
import 'bootstrap/dist/css/bootstrap.min.css';



const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
// app.use(ElementPlus)
app.use(ArcoVue);
Notification._context = app._context;

app.mount('#app')
