<template>
  <input 
    type="file" 
    ref="file" 
    @change="readFile" 
    multiple="multiple"
  />

  <el-button type="primary">
      Upload<el-icon class="el-icon--right"><Upload /></el-icon>
  </el-button>

  <h2>Files to Upload</h2>
  <ul>
    <li v-for="file in files">
      {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
    </li>
  </ul>
</template>

<script>
// import * as IPFS from 'ipfs-core'
import { create } from 'ipfs-http-client'
export default {
  data() {
    return {
      files:[]
    }
  },
  methods:{
    async readFile() {
      this.files = Array.from(await this.$refs.file.files)
    },
    removeFile(file){
      this.files = this.files.filter(f => {
        return f != file;
      });      
    },
    async upload() {
      let fileObjectsArray = this.files.map((file) => {
        return {
          path: file.name,
          content: file
        }
      })
      // const ipfs = await IPFS.create()
      const ipfs = await new create('http://127.0.0.1:5001')
      const result = []
      for await (const resultPart of ipfs.addAll(fileObjectsArray, { wrapWithDirectory: true })) {
        result.push(resultPart)
      }
      // result = await Promise.all(ipfs.addAll(fileObjectsArray), { wrapWithDirectory: true })
      console.log(result)
    },
  }
}
</script>