<template>
  <!-- <Header/> -->
  <p>The CID is {{cid}}</p>
  <!-- <Web3Connector/> -->
  <FileUpload @cid="getCID"/>
  <!-- <PushPrePrint :cid="cid"/>
  <ContractInfo/> -->
</template>

<script setup lang="ts">
import { ref } from 'vue'
// import Header from './components/Header.vue'
import FileUpload from './components/FileUpload.vue'
// import Web3Connector from './components/Web3Connector.vue'
// import PushPrePrint from './components/PushPrePrint.vue'
// import ContractInfo from './components/ContractInfo.vue'

const cid = ref("")

const getCID = function(c: any) {
  cid.value = c.cid
}

</script>

