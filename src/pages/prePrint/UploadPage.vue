<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div class="container">
          <div class="file-upload-container">
            <FileUpload/>
          </div>
          <Suspense>
            <router-view/>
            <template #fallback>
              Loading...
            </template>
          </Suspense>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
import MetaInfo from './MetaInfoForm.vue'

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
