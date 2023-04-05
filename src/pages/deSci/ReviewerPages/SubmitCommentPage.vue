<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div>
          <Suspense>
            <PaperInfo :address="$props.address" :cid="$props.paperCID"/>
          </Suspense>
        </div>
        <div class="divider"></div>
        <h3 class="title">Upload your review comments and make your decision</h3>
        <div class="container">
          <div class="file-upload-container">
            <FileUpload/>
          </div>
          <SubmitCommentCID :address="$props.address" :paperCID="$props.paperCID"/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
import FileUpload from '@/components/FileUpload.vue'
import SubmitCommentCID from './SubmitCommentCID.vue'
import PaperInfo from '@/pages/deSci/PaperInfo.vue'

defineProps(
  {
    address: {
        type: String,
        required: true,
    },
    paperCID: {
        type: String,
        required: true,
    },
  }
);


</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-align: center;
}

.divider {
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  width: 100%;
}


</style>
  