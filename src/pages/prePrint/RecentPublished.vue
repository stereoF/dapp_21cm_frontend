<template>
    <a-list :style="{ width: `800px` }" :virtualListProps="{
        height: 600,
    }" :data="paperListInfoShow">
        <template #header>
          Recent Published in PrePrint
        </template>

        <template #item="{ item, index }">
            <a-list-item :key="index">
                <div>
                    <a-card :style="{ width: '600px' }" :title="item.title">
                        <template #extra>
                            <router-link
                                :to="{ name: 'preprint-paper-info', params: { address: props.address, paperCID: item.paperCID } }">
                                more
                            </router-link>
                        </template>
                        {{ item.abstract.substring(0, 300) }}{{ item.abstract.length > 300 ? '...' : '' }}
                    </a-card>
                </div>
            </a-list-item>
        </template>
    </a-list>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ethers } from "ethers";
import PrePrintTrack from "@/contracts/preprint/PrePrintTrack.json";
import { useProvider } from '@/scripts/ethProvider';
import { usePaperMeta } from '@/scripts/paperMetaDB';
// import { useDescription } from '@/scripts/paperDescription';

const props = defineProps({
  address: {
    type: String,
    required: true
  }
});

const { provider } = await useProvider();
const prePrint = new ethers.Contract(
  props.address,
  PrePrintTrack.abi,
  provider
);

let printCnt = await prePrint.prePrintCnt();
let showCnt = ref(1000);
let startIndex = ref(printCnt - showCnt.value);

let paperListInfoShow = reactive([] as any[]);

if (printCnt > 0) {
  let papers = await prePrint.prePrintCIDs(startIndex.value >= 0 ? startIndex.value : 0, printCnt - 1 >= 0 ? printCnt - 1 : 0)
  let paperItems = await papers.map(async (paper: string) => {
    let printInfo = await prePrint.prePrints(paper);
    let { fieldList, abstractData } = await usePaperMeta(props.address, paper);
    return {
      title: printInfo.keyInfo,
      paperCID: paper,
      fields: fieldList,
      abstract: abstractData,
    }
  });
  paperListInfoShow = reactive(await Promise.all(paperItems));
}

</script>
