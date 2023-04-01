<!-- <template>
  <el-upload
    ref="upload"
    v-model:file-list="fileList"
    class="upload-demo"
    action=""
    multiple
    :auto-upload="false"
  >
    <template #trigger>
        <el-button type="primary">select directory</el-button>
    </template>
    <template #tip>
      <div class="el-upload__tip">
        select the directory/folder contains your materials.
      </div>
    </template>
    <div style="display: flex; align-items: center;">
      <el-button class="mr-3" type="success" :disabled="fileListEmpty" @click="submitUpload">
          get the cid
      </el-button>
      <el-checkbox v-model="uploadToServer" style="margin-right: 10px;" checked>upload to server</el-checkbox>
    </div>
  </el-upload>
  <div v-if="cidMismatch" class="error-message">
    Frontend and backend computed different CIDs.
  </div>
</template> -->

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
      <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" v-model="uploadToServer" id="uploadToServerSwitch" checked>
          <label class="form-check-label" for="uploadToServerSwitch">Upload to server</label>
      </div>
    </div>
  </el-upload>
  <div v-if="cidMismatch" class="error-message mt-3">
    Frontend and backend computed different CIDs.
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { UploadUserFile,UploadInstance } from 'element-plus'
import * as IPFS from 'ipfs-core'
import { onMounted } from 'vue'
import axios from 'axios'
import { useUploadStore } from '../store/upload' 

const store = useUploadStore()

// const ipfs = await IPFS.create()
const ipfs = IPFS.create()
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

const uploadToServer = ref(false)

const submitUpload = async () => {
  // console.log(fileList.value)
  let cid
  try {
    let fileObjectsArray = fileList.value.map((file) => {
      // console.log(file.raw?.webkitRelativePath)
        return {
          // path: file.name,
          path: file.raw?.webkitRelativePath,
          content: file.raw
        }
    }) as any
  
  // console.log(fileObjectsArray)
    let result:any[] = []
    for await (const resultPart of (await ipfs).addAll(fileObjectsArray, { wrapWithDirectory: true })) {
      result.push(resultPart)
      // console.log(resultPart.path, resultPart.cid.toString())
    }
    cid = result.find(e => e.path==="").cid.toString()
    // console.log(cid)
    // console.log(result)
  } catch (error) {
    console.log(error)
  }
  if (uploadToServer.value) {
    let formData:any = new FormData();  
    fileList.value.forEach(file => {formData.append('files', file.raw)}) 

    let res = await axios.post("http://127.0.0.1:8000/files/uploadfiles/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
    let cid2 = res.data.cid
    if (cid === cid2) {
      fileList.value = []
    }
  }
  if (!uploadToServer.value) {
      fileList.value = []
  }
  // emits('cid-value', cid)
  store.setCid(cid)
  // upload.value!.submit()

}

// const handleSuccess = (response: any, file: any, fileList: any) => {
//   console.log(response)
//   console.log(file)
//   console.log(fileList)
//   emits('cid-value', response.cid)
// }

</script>


<!-- <style>
.error-message {
  color: red;
}
</style> -->


        
<style scoped>
.error-message {
  color: red;
  font-size: 14px;
  font-weight: 500;
}
</style>
