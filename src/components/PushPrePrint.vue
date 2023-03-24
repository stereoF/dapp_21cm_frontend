<template>
    <div class="hello">
      <p>
        The cid need to push: {{cid}}
      </p>
      <button id="contractCall" @click="contractCall">Push the Pre-Print CID to contract</button>
    </div>
  </template>
  
  <script>
    import { defineComponent, reactive } from 'vue';
    import { ethers } from "ethers";
    import PrePrintArtifact from "../contracts/PrePrintTrack.json";
    import contractAddress from "../contracts/contract-address.json";
    import { storeToRefs } from 'pinia';
    import { useUploadStore } from '../store/upload';

    export default defineComponent({
      name: 'PushPrePrint',
      setup() {
        const store = useUploadStore();
        const { cid } = storeToRefs(store);

        const contractCall = async () => {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const prePrint = new ethers.Contract(
            contractAddress.PrePrintTrack,
            PrePrintArtifact.abi,
            provider
          );
          // console.log('The cid need to push: ', this.cid)
          const PrePrintWithSigner = prePrint.connect(signer);
          await PrePrintWithSigner.submit(cid.value, 'test', 'test');
        }

        return {
          cid,
          contractCall
        };
      },
    });

    // export default {
    //   name: "PushPrePrint",
    //   // props:['cid'],
    //   methods: {
    //     contractCall: async function () {
    //       const provider = new ethers.providers.Web3Provider(window.ethereum);
    //       const signer = provider.getSigner();
    //       const prePrint = new ethers.Contract(
    //         contractAddress.PrePrintTrack,
    //         PrePrintArtifact.abi,
    //         provider
    //       );
    //       // console.log('The cid need to push: ', this.cid)
    //       const PrePrintWithSigner = prePrint.connect(signer);
    //       await PrePrintWithSigner.submit(this.cid, 'test', 'test')
    //     },
    //   }
    // };

  </script>
  