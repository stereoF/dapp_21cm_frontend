<template>
  <el-upload
    ref="upload"
    v-model:file-list="fileList"
    class="upload-demo"
    action=""
    multiple
    :auto-upload="false"
  >
    <template #trigger>
        <el-button type="primary" class="btn btn-primary">Select Directory</el-button>
    </template>
    <template #tip>
      <div class="el-upload__tip">
        Select the directory/folder contains your materials.
      </div>
    </template>
    <div style="display: flex; align-items: center;">
      <el-button class="mr-3 btn btn-success" type="success" :disabled="fileListEmpty" @click="submitUpload">
          Get the CID
      </el-button>
      <!-- <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" v-model="uploadToServer" id="uploadToServerSwitch" checked>
          <label class="form-check-label" for="uploadToServerSwitch">Upload to server</label>
      </div> -->
    </div>
  </el-upload>
  <div v-if="cidMismatch" class="error-message mt-3">
    Frontend and backend computed different CIDs.
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { UploadUserFile,UploadInstance } from 'element-plus'
// import * as IPFS from 'ipfs-core'
import { onMounted } from 'vue'
import axios from 'axios'
import { useUploadStore } from '../store/upload' 
// import { useIPFS } from '@/scripts/ipfs'

const store = useUploadStore()

// const ipfs = await IPFS.create()
// const ipfs = IPFS.create()
const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()

const cid = ref('')
const cid2 = ref('')

const cidMismatch = computed(() => {
  return cid.value !== cid2.value
})

// const emits = defineEmits(['cid-value'])

onMounted(() => {
  // console.log(`the component is now mounted.`)
  const inputEle = document.getElementsByClassName("el-upload__input")[0] as HTMLInputElement
  inputEle.webkitdirectory = true
})

const fileListEmpty = computed(() => {
  return fileList.value.length > 0 ? false : true
})

// const uploadToServer = ref(true)

const submitUpload = async () => {
  // let fileObjectsArray = fileList.value.map((file) => {
  //       return {
  //         path: file.raw?.webkitRelativePath,
  //         content: file.raw
  //       }
  //   }) as any
    // let cid2 = useIPFS(fileObjectsArray);
    let formData:any = new FormData();  
    fileList.value.forEach(file => {formData.append('files', file.raw)}) 

    let res = await axios.post("http://127.0.0.1:8000/files/uploadfiles/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
    let cid = res.data.cid
    fileList.value = []
    store.setCid(cid)
}

</script>
        
<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  font-weight: 500;
}
</style>
