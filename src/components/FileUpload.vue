<template>
  <el-upload
    ref="upload"
    v-model:file-list="fileList"
    class="upload-demo"
    drag
    action=""
    multiple
    :auto-upload="false"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop files here or <em>click to upload directory</em>
    </div>
    <!-- <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template> -->
  </el-upload>
  <el-button class="ml-3" type="success" @click="submitUpload">
      upload to server
  </el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { UploadFilled } from '@element-plus/icons-vue'
import type { UploadProps, UploadUserFile,UploadInstance } from 'element-plus'
import * as IPFS from 'ipfs-core'
import { onMounted } from 'vue'
import axios from 'axios'

// const ipfs = await IPFS.create()
const ipfs = IPFS.create()
const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()

onMounted(() => {
  // console.log(`the component is now mounted.`)
  const inputEle = document.getElementsByClassName("el-upload__input")[0] as HTMLInputElement
  inputEle.webkitdirectory = true
})

const submitUpload = async () => {
  // console.log(fileList.value)
  try {
    let fileObjectsArray = fileList.value.map((file) => {
        return {
          path: file.name,
          content: file.raw
        }
    })
  
  // console.log(fileObjectsArray)
    let result:any[] = []
    for await (const resultPart of (await ipfs).addAll(fileObjectsArray, { wrapWithDirectory: true })) {
      result.push(resultPart)
    }
    let cid = result.find(e => e.path==="").cid.toString()
    console.log(cid)
    // console.log(result)
  } catch (error) {
    console.log(error)
  }
  let formData:any = new FormData();  
  fileList.value.forEach(file => {formData.append('files', file.raw)}) 

  axios.post("http://127.0.0.1:8000/uploadfiles/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
  upload.value!.submit()

}

</script>