<template>
    <div class="hello">
      <button id="contractCall" @click="contractCall">Push the Pre-Print CID to contract</button>
      <p>
        The cid need to push: {{cid}}
      </p>
    </div>
  </template>
  
  <script>
    import { ethers } from "ethers";
    import PrePrintArtifact from "../contracts/PrePrintTrack.json";
    import contractAddress from "../contracts/contract-address.json";
  
    export default {
      name: "PushPrePrint",
      props:['cid'],
      methods: {
        contractCall: async function () {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const prePrint = new ethers.Contract(
            contractAddress.PrePrintTrack,
            PrePrintArtifact.abi,
            provider
          );
          const ownerAddress = await prePrint.owner();
          console.log("The owner of this contract: ", ownerAddress.toString());
          console.log('The cid need to push: ', this.cid)
        },
      }
    };
  </script>
  