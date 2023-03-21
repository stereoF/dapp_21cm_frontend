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
        <el-button type="primary">select file</el-button>
    </template>
    <el-button class="ml-3" type="success" :disabled="fileListEmpty" @click="submitUpload">
        upload to server
    </el-button>
    <!-- <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop files here or <em>click to upload directory</em>
    </div> -->
    <template #tip>
      <div class="el-upload__tip">
        select the directory/folder contains your materials.
        <br>A json file named 'meta.json' <em>must</em> be contained.
      </div>
    </template>
  </el-upload>
  <div v-if="cidMismatch" class="error-message">
    Frontend and backend computed different CIDs.
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { UploadUserFile,UploadInstance } from 'element-plus'
import * as IPFS from 'ipfs-core'
import { onMounted } from 'vue'
import axios from 'axios'

// const ipfs = await IPFS.create()
const ipfs = IPFS.create()
const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()

const cid = ref('')
const cid2 = ref('')

const cidMismatch = computed(() => {
  return cid.value !== cid2.value
})

const emits = defineEmits(['cid-value'])

onMounted(() => {
  // console.log(`the component is now mounted.`)
  const inputEle = document.getElementsByClassName("el-upload__input")[0] as HTMLInputElement
  inputEle.webkitdirectory = true
})

const fileListEmpty = computed(() => {
  return fileList.value.length > 0 ? false : true
})

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
  let formData:any = new FormData();  
  fileList.value.forEach(file => {formData.append('files', file.raw)}) 

  let res = await axios.post("http://127.0.0.1:8000/files/uploadfiles/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
  let cid2 = res.data.cid
  if (cid === cid2) {
    fileList.value = []
  }
  emits('cid-value', cid)
  // upload.value!.submit()

}

// const handleSuccess = (response: any, file: any, fileList: any) => {
//   console.log(response)
//   console.log(file)
//   console.log(fileList)
//   emits('cid-value', response.cid)
// }

</script>


<style>
.error-message {
  color: red;
}
</style>
