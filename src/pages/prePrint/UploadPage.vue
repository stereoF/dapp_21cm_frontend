<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header>
        <Header/>
      </el-header> -->
      <el-main>
        <div class="container">
          <div class="file-upload-container">
            <FileUpload/>
            <!-- <FileUpload class="center" @cid-value="cidValue = $event"/> -->
            <!-- <div v-if="cidValue">CID Value: {{cidValue}}</div> -->
          </div>
          <MetaInfo address="0xbb207a3FaCC8A2f2E48441F140109FEA0d53DfFE"/>
          <!-- <PushPrePrint/> -->
          <!-- <ContractInfo/> -->
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import FileUpload from '@/components/FileUpload.vue'
import MetaInfo from './MetaInfoForm.vue'
// import ContractInfo from '@/components/ContractInfo.vue'
// import { ref } from 'vue'

// const cidValue = ref(null)

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
