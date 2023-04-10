<template>
  <div class="common-layout">
    <a-layout>
      <a-layout-content>
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
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import FileUpload from '@/components/FileUpload.vue'
// import FileUploadAcro from '@/components/upload/FileUploadAcro.vue';
// import MetaInfo from './MetaInfoForm.vue'

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
