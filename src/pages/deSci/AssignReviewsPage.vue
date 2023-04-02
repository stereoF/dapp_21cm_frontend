<template>
    <div class="common-layout">
      <el-container>
        <el-main>
          <div class="container">
            <div>
                <Suspense>
                    <PaperInfo :cid="props.paperId" :address="props.address"/>
                </Suspense>                
            </div>
            <div>
              <EditReviewers :paperId="props.paperId" :address="props.address"/>
            </div>
          </div>
        </el-main>
      </el-container>
    </div>
  </template>
  
  <script setup>
  import { defineAsyncComponent, ref } from 'vue';
  import EditReviewers from './EditReviewers.vue';
  const PaperInfo = defineAsyncComponent(() => import('./PaperInfo.vue'));

  const props = defineProps(
    {
      paperId: String,
      address: String,
    }
  );

  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  </style>
  