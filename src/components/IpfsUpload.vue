<template>
    <div>
      <h1>{{ status }}</h1>
      <h2>ID: {{ id }}</h2>
      <h2>Agent version: {{ agentVersion }}</h2>
      <h3>Files : {{ fileContents }}</h3>
  
      <form>
        <input
          class="fileInput"
          type="file"
          name="fileInput"
          ref="fileInput"
          @change="onFileSelected"
        />
  
        <!-- <button @click="this.refs.selectedFile.click()">Choose File</button> -->
        <button type="button" @click="saveIPFS">Upload</button>
  
        <button type="button" @click="getIPFS">Get IPFS</button> -->
      </form>
    </div>
  </template>
  
  <script>
  import * as IPFS from 'ipfs-core'
//   import VueIpfs from 'ipfs-core'
//   const ipfs = VueIpfs.create()
  var node
  var file
  const fileContents = []
  
  //  The below code should create an IPFS node to add files to
  export default {
    name: 'IpfsInfo',
    data: function () {
      return {
        status: 'Connecting to IPFS...',
        id: '',
        agentVersion: '',
        selectedFile: null,
        fileContents: this.fileContents,
      }
    },
    mounted: function () {
      // console.log(VueIpfs)
    //   this.getIpfsNodeInfo()
    },
    methods: {
      onFileSelected(event) {
        this.selectedFile = event.target.files[0]
      },
  
      async saveIPFS() {
        const ipfs = await IPFS.create()
        const { cid } = await ipfs.add('Hello world')
        console.info(cid)
      },
  
    //   getIPFS() {
    //     const resultPart = node.files.ls('/')
    //     fileContents.push(resultPart)
    //     //console.log(fileContents)
    //     return fileContents
    //   },
  
    //   async getIpfsNodeInfo() {
    //     try {
    //       // Await for ipfs node instance.
    //       node = await ipfs
    //       //console.log(ipfs)
    //       // Call ipfs `id` method.
    //       // Returns the identity of the Peer.
    //       const { agentVersion, id } = await node.id()
    //       this.agentVersion = agentVersion
    //       this.id = id
    //       // Set successful status text.
    //       this.status = 'Connected to IPFS =)'
    //     } catch (err) {
    //       // Set error status text.
    //       this.status = `Error: ${err}`
    //     }
    //   },
    },
  }
  </script>