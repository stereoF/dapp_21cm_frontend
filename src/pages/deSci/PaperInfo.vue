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
    <a-collapse :default-active-key="['3']">
      <a-collapse-item header="Basic Information of peer review result" key="3">
        <a-descriptions :data="basicInfo" title="Review Result" />
      </a-collapse-item>
      <a-collapse-item header="Information about review comments and replies" key="2">
        <div v-for="result in reviewResultShow">
          <a-descriptions :data="result.obj" :title="result.name" />
          <a-link v-if="result.obj[0].value != ''" :href="VITE_IPFS_GATEWAY + result.obj[0].value" target="_blank">
            <a-button type="primary">View Comment</a-button>
          </a-link>
          <a-link v-if="result.obj[1].value != ''" :href="VITE_IPFS_GATEWAY + result.obj[1].value" target="_blank">
            <a-button type="primary">View Reply</a-button>
          </a-link>
        </div>
      </a-collapse-item>
      <a-collapse-item header="Web3 Information Related to this paper" key="1">
        <a-descriptions :data="web3Info" title="Web3 Info" />
      </a-collapse-item>
    </a-collapse>
    <a-button-group>
      <a-button :disabled="prevCID === ''" type="primary" @click="toPrev">
        <icon-left />
        Prev Version
      </a-button>
      <a-button :disabled="nextCID === ''" type="primary" @click="toNext">
        Next Version
        <icon-right />
      </a-button>
    </a-button-group>
  </a-space>
</template>

<script lang="ts" setup>
import { usePaperInfo } from '@/scripts/paperInfo';
import { useRouter, useRoute } from 'vue-router';
import { watch } from 'vue';
import { usePaperMeta } from '@/scripts/paperMetaDB';

const router = useRouter();
let route = useRoute();

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

const { web3Info, basicInfo, reviewResultShow, prevCID, nextCID, title } = await usePaperInfo(props.address, props.paperCID);

let { authorsData, fieldList, abstractData } = await usePaperMeta(props.address, props.paperCID);

const toPrev = () => {
  // console.log(prevCID)
  router.push({
    name: 'desci-paper-info',
    params: {
      address: props.address,
      paperCID: prevCID,
    },
  });
};

const toNext = () => {
  // console.log(nextCID)
  router.push({
    name: 'desci-paper-info',
    params: {
      address: props.address,
      paperCID: nextCID,
    },
  });
};

watch(
  () => route.params, (previous, current) => {
    // console.log(`${previous} and ${current}`);
    router.go(0)
  },
  { deep: true }
)

</script>
