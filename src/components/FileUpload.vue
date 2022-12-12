<template>
  <input 
    type="file"
    @change="readFile" 
    multiple="multiple"
    ref="inputFile"
  />

  <el-button type="primary"  @click="upload">
      Upload<el-icon class="el-icon--right"><Upload /></el-icon>
  </el-button>

  <h2>Files to Upload</h2>
  <ul>
    <li v-for="file in files">
      {{ file.name }} ({{ file.size | kb }} kb) <button @click="removeFile(file)" title="Remove">X</button>
    </li>
  </ul>
  <p>The CID of uploaded files: {{cid}}</p>
</template>

<script>
// import * as IPFS from 'ipfs-core'
import { create } from 'ipfs-http-client'
export default {
  data() {
    return {
      files:[],
      cid:"",
    }
  },
  methods:{
    async readFile(event) {
      // this.files = Array.from(await this.$refs.file.files)
      console.log(event.target.files)
      this.files = Array.from(await event.target.files)
      this.$refs.inputFile.value = null;
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
      let result = []
      for await (const resultPart of ipfs.addAll(fileObjectsArray, { wrapWithDirectory: true })) {
        result.push(resultPart)
      }
      // result = await Promise.all(ipfs.addAll(fileObjectsArray), { wrapWithDirectory: true })
      this.cid = result.find(e => e.path==="").cid.toString()
    },
  }
}
</script>