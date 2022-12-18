<template>
    <div>
      <button id="showInfo" @click="getInfo">show the published cids</button>
    </div>
  </template>

  
<script>
import { ethers } from "ethers";
import PrePrintArtifact from "../contracts/PrePrintTrack.json";
import contractAddress from "../contracts/contract-address.json";

export default {
  name: "contractInfo",
  methods: {
    getInfo: async function() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const prePrint = new ethers.Contract(
            contractAddress.PrePrintTrack,
            PrePrintArtifact.abi,
            provider
        );
        const ownerAddress = await prePrint.owner();
        console.log("The owner of this contract: ", ownerAddress.toString());
        const publishedCID = await prePrint.prePrintCIDs(0);
        console.log("The Published CIDs:", publishedCID.toString())
    }
  }
};
</script>