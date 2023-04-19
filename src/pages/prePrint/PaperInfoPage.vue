<template>
  <br />
  <a-space direction="vertical" size="large" fill>
    <a-typography>
      <a-typography-title :heading="4">Title</a-typography-title>
      <a-typography-paragraph>{{ title }}</a-typography-paragraph>
      <a-typography-title :heading="4">Abstract</a-typography-title>
      <a-typography-paragraph>{{ abstractData }}</a-typography-paragraph>
      <a-typography-title :heading="4">Fields</a-typography-title>
      <a-typography-paragraph>{{ fieldList.join(',') }}</a-typography-paragraph>
    </a-typography>
    <a-list>
      <template #header>
        Information of Authors
      </template>
      <a-list-item v-for="author in authorsData">
        <a-descriptions :data="author" />
      </a-list-item>
    </a-list>
    <a-link :href="VITE_IPFS_GATEWAY + props.paperCID" target="_blank">
      <a-button type="primary">View Paper</a-button>
    </a-link>
  </a-space>
</template>

<script lang="ts" setup>
import { usePaperMeta } from '@/scripts/paperMetaDB';
import { useProvider } from '@/scripts/ethProvider';
import { ethers } from "ethers";
import PrePrintTrack from "@/contracts/preprint/PrePrintTrack.json";


const VITE_IPFS_GATEWAY = import.meta.env.VITE_IPFS_GATEWAY;

const props = defineProps(
  {
    address: {
      type: String,
      required: true,
    },
    paperCID: {
      type: String,
      required: true,
    },
  }
);

const { provider } = await useProvider();
const prePrint = new ethers.Contract(
  props.address,
  PrePrintTrack.abi,
  provider
);

let printInfo = await prePrint.prePrints(props.paperCID);
let title = printInfo.keyInfo;

let { authorsData, fieldList, abstractData } = await usePaperMeta(props.address, props.paperCID);


</script>
