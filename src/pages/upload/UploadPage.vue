<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <Header/>
      </el-header>
      <el-main>
        <div class="container">
          <div class="file-upload-container">
            <FileUpload class="center"/>
            <!-- <FileUpload class="center" @cid-value="cidValue = $event"/> -->
            <!-- <div v-if="cidValue">CID Value: {{cidValue}}</div> -->
          </div>
          <MetaInfo/>
          <!-- <PushPrePrint/> -->
          <ContractInfo/>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import FileUpload from '../../components/FileUpload.vue'
import Header from '../../components/Header.vue'
import MetaInfo from '../../components/MetaInfo.vue'
// import PushPrePrint from '../../components/PushPrePrint.vue'
import ContractInfo from '../../components/ContractInfo.vue'
import { ref } from 'vue'

const cidValue = ref(null)

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
