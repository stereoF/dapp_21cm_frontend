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
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import FileUpload from '../../components/FileUpload.vue'
import Header from '../../components/Header.vue'
import MetaInfo from '../../components/MetaInfo.vue'
import { ref } from 'vue'

const cidValue = ref(null)

// check if metamask is connected and get balance from contract
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>
