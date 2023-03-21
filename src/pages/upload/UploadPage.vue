<template>
  <div class="container">
    <div class="menu">
      <div class="logo"></div>
      <div class="menu-items">
        <div class="menu-item">首页</div>
        <div class="menu-item">期刊首页</div>
        <div class="menu-item">我的文章</div>
      </div>
      <div class="metamask-button">
        <div class="balance" v-if="isConnected">{{balance}}</div>
        <button v-else>连接metamask</button>
      </div>
    </div>
    <div class="file-upload-container">
      <FileUpload class="center" @cid-value="cidValue = $event"/>
      <div v-if="cidValue">CID Value: {{cidValue}}</div>
    </div>
  </div>
</template>

<script setup>
import FileUpload from '../../components/FileUpload.vue'
import { ref } from 'vue'

const isConnected = ref(false)
const balance = ref(0)
const cidValue = ref(null)

// check if metamask is connected and get balance from contract
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #f2f2f2;
  padding: 0 20px;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: #000;
}

.menu-items {
  display: flex;
  gap: 20px;
}

.menu-item {
  font-size: 16px;
  color: #000;
  cursor: pointer;
}

.metamask-button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: #000;
  cursor: pointer;
}

.balance {
  font-size: 16px;
  color: #000;
}
</style>
