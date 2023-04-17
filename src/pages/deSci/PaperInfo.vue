<template>
  <br/>
  <a-space direction="vertical" size="large" fill>
    <a-descriptions :data="basicInfo" title="Basic Info" />
    <a-link :href="VITE_IPFS_GATEWAY + props.paperCID" target="_blank">
      <a-button type="primary">View Paper</a-button>
    </a-link>
    <a-collapse>
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

const { web3Info, basicInfo, reviewResultShow, prevCID, nextCID } = await usePaperInfo(props.address, props.paperCID);

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
