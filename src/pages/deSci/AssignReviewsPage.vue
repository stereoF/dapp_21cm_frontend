<template>
    <div class="common-layout">
      <el-container>
        <el-main>
          <div class="container">
            <Suspense>
              <PaperInfo cid="QmNsg7X3q52nTCR3orc5XiWcWcVhS6T63UrqcT7mLqSdGJ"/>
            </Suspense>
          </div>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent } from 'vue'
  const PaperInfo = defineAsyncComponent(() => import('./PaperInfo.vue'))
  
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  </style>
  