<template>
  <div class="container">
    <h2 class="title">Recent Published</h2>
      <div v-for="(item, index) in items" :key="index">
        <PaperCard :item="item" />
      </div>
    </div>
</template>

<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import { ethers } from "ethers";
  import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
  import { useProvider } from '@/scripts/ethProvider';
  import PaperCard from '@/components/PaperCard.vue';

  const { provider } = await useProvider();
  const deSciPrint = new ethers.Contract(
    // props.address,
    "0xbFF8fd2Eb33F72EFE52b4F54DDDC68994Ade57F5",
    DeSciPrint.abi,
    provider
  );

  let journalName = ref(await deSciPrint.name());
  let printCnt = await deSciPrint.deSciPrintCnt();
  let showCnt = ref(1000);
  let startIndex = ref(printCnt - showCnt.value);
  if (startIndex.value < 0) {
    startIndex.value = 0;
  }
  let papers = await deSciPrint.printsPool(7, startIndex.value, printCnt-1);
  let paperItems = await papers.map(async (paper:string) => {
      let printInfo = await deSciPrint.deSciPrints(paper);
      return {
        title: printInfo.keyInfo,
        link: "#"
      }
    });
  let items = reactive(await Promise.all(paperItems));

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.card {
  width: 40rem;
}
.card-body {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.title {
  width: 80%;
  align-items: center;
}
.btn {
  display: inline-block;
}
.card-title {
  display: inline-block;
}
.card-text {
  display: block;
}
.divider {
  margin-top: 5px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  width: 100%;
}
</style>