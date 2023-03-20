import { createApp } from 'vue'
import UploadPage from '../src/pages/upload/UploadPage.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(UploadPage)

app.use(ElementPlus)
app.mount('#app')
