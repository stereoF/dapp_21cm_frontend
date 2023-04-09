<template>
  <div class="container">
    <h2 class="title">Recent Published in PrePrint</h2>
      <div v-for="(item, index) in items" :key="index">
        <PaperCard :item="item" />
      </div>
    </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { ethers } from "ethers";
  import PrePrintTrack from "@/contracts/preprint/PrePrintTrack.json";
  import PaperCard from '@/components/PaperCard.vue';
  import { useProvider } from '@/scripts/ethProvider';
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

  let items = reactive([] as any[]);

  if (printCnt > 0) {
    let papers = await prePrint.prePrintCIDs(startIndex.value >=0 ? startIndex.value:0, printCnt-1>=0 ? printCnt-1:0)
    let paperItems = await papers.map(async (paper:string) => {
        let printInfo = await prePrint.prePrints(paper);
        return {
          title: printInfo.keyInfo,
          link: "#"
        }
      });
    items = reactive(await Promise.all(paperItems));
  }

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.title {
  width: 80%;
  align-items: center;
}
</style>