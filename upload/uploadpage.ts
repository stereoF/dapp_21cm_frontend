import { createApp } from 'vue'
import { createPinia } from 'pinia'
import UploadPage from '../src/pages/upload/UploadPage.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(UploadPage)
const pinia = createPinia()

app.use(ElementPlus)
app.use(pinia)
app.mount('#app')
