<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="container">
          <div class="file-upload-container">
            <FileUpload/>
            <!-- <div v-if="cidValue">CID Value: {{cidValue}}</div> -->
          </div>
          <Suspense>
            <!-- <MetaInfo address="0xcfCA439EB07c003e152137C189199170285d87fD"/> -->
            <router-view/>
            <template #fallback>
              Loading...
            </template>
          </Suspense>
          <!-- <ContractInfo/> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
// import { defineAsyncComponent } from 'vue'
// const MetaInfo = defineAsyncComponent(() => import('./MetaInfoForm.vue'))

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
