<template>
  <el-upload
    ref="upload"
    v-model:file-list="fileList"
    class="upload-demo"
    drag
    action="http://127.0.0.1:8000/uploadfile/"
    multiple
    :auto-upload="false"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      Drop file here or <em>click to upload</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        jpg/png files with a size less than 500kb
      </div>
    </template>
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
// import $ from 'jquery'

const fileList = ref<UploadUserFile[]>([])
const upload = ref<UploadInstance>()

const submitUpload = async () => {
  let fileObjectsArray = fileList.value.map((file) => {
        return {
          path: file.name,
          content: file.raw
        }
      })
  // console.log(fileObjectsArray)
  // const ipfs = await IPFS.create()
  // let result:any[] = []
  // for await (const resultPart of ipfs.addAll(fileObjectsArray, { wrapWithDirectory: true })) {
  //   result.push(resultPart)
  // }
  // let cid = result.find(e => e.path==="").cid.toString()
  // console.log(cid)
  // console.log(result)
  upload.value!.submit()
  // console.log($.get("http://127.0.0.1:8000/"))
}
// action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
</script>