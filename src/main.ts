import { createApp } from 'vue'
import App from './App.vue'
import 'windi.css'
import './style.css'
import router from './router'
import { VueDapp } from "vue-dapp"
import { ethers } from 'ethers'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


const app = createApp(App)

app.use(router)
app.use(VueDapp, {
    80001: {
      chainId: ethers.utils.hexValue(80001),
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
      chainName: 'Mumbai',
      rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
      nativeCurrency: {
        name: 'Mumbai',
        decimals: 18,
        symbol: 'MATIC',
      },
    },
  })
app.use(ElementPlus)
// app.use(vuetify)

app.mount('#app')
