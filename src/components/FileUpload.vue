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
      let files = Array.from(this.$refs.file.files)
      let fileObjectsArray = files.map((file) => {
        return {
          path: file.name,
          content: file
        }
      })
      // const ipfs = await IPFS.create()
      const ipfs = await new create('http://127.0.0.1:5001')
      const result = []
      for await (const resultPart of ipfs.addAll(files, { wrapWithDirectory: true })) {
        result.push(resultPart)
      }
      // result = await Promise.all(ipfs.addAll(fileObjectsArray), { wrapWithDirectory: true })
      console.log(result)
    }
  }
}
</script>