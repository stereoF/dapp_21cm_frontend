<script setup lang="ts">
import { ref } from 'vue'
import Header from './components/Header.vue'
import FileUpload from './components/FileUpload.vue'
import Web3Connector from './components/Web3Connector.vue'
import PrePrintContract from './components/PushPrePrint.vue'

const cid = ref("")

const getCID = function(c: any) {
  cid.value = c
}

</script>

<template>
  <Header/>
  <p>The CID is {{cid}}</p>
  <Web3Connector/>
  <FileUpload @cid="getCID"/>
  <PrePrintContract/>
</template>
