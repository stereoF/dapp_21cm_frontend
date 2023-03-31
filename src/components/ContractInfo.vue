<template>
    <div>
      <button id="showInfo" @click="getInfo">show the published cids</button>
    </div>
  </template>

  
<script lang="ts">
import { ethers } from "ethers";
import PrePrintTrack from "@/contracts/preprint/PrePrintTrack.json";
import contractAddress from "@/contracts/preprint/contract-address.json";

export default {
  name: "contractInfo",
  methods: {
    getInfo: async function() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const prePrint = new ethers.Contract(
            "0xa8607C743A6f1F12cdF30Fc26Cd58012E1083B10",
            PrePrintTrack.abi,
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