import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": {},
    global: 'globalThis'
  },
  plugins: [vue(), WindiCSS()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    // rollupOptions: {
    //    input: {
    //       // 配置所有页面路径，使得所有页面都会被打包
    //       main: resolve(__dirname, 'index.html'),
    //       uploadpage: resolve(__dirname, 'upload/index.html')
    //    }
    // }
 },
  optimizeDeps: {
    esbuildOptions: {
      supported: { 
        bigint: true 
      }
    }
  }
})

