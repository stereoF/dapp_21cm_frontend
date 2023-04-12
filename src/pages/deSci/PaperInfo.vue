<template>
  <a-space direction="vertical" size="large" fill>
    <a-descriptions :data="basicInfo" title="Basic Info" />
    <a-collapse>
      <a-collapse-item header="Information about review comments and replies" key="2">
        <div v-for="result in reviewResultShow">
          <a-descriptions :data="result.obj" :title="result.name" />
        </div>
      </a-collapse-item>
      <a-collapse-item header="Web3 Information Related to this paper" key="1">
        <a-descriptions :data="web3Info" title="Web3 Info" />
      </a-collapse-item>
    </a-collapse>
  </a-space>
</template>

<script lang="ts" setup>
import { usePaperInfo } from '@/scripts/paperInfo';

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


const { web3Info, basicInfo, reviewResultShow } = await usePaperInfo(props.address, props.paperCID);

</script>