<template>
  <input 
    type="file" 
    ref="file" 
    @change="readFile" 
    multiple="multiple"
  />
</template>

<script>
// import * as IPFS from 'ipfs-core'
import { create } from 'ipfs-http-client'
export default {
  data() {
    return {
    }
  },
  methods:{
    async readFile() {
      let files = this.$refs.file.files
      console.log(files)
      // const ipfs = await IPFS.create()
      const ipfs = new create('http://127.0.0.1:5001')
      const result = []
      for await (const resultPart of ipfs.addAll(files)) {
        result.push(resultPart)
      }
      console.log(result)
      console.log(ipfs.addAll(files))
    }
  }
}
</script>