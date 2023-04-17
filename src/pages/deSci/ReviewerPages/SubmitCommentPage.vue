<template>
  <div class="common-layout">
    <a-layout>
      <a-layout-content>
        <div v-if="!isReviewer">
          <a-alert type="warning">You are not the reviewer of this paper.</a-alert>
        </div>
        <div v-else>
          <div>
            <Suspense>
              <PaperInfo :address="$props.address" :paperCID="$props.paperCID" />
              <template #fallback>
                <a-space size="large">
                  <a-spin :size="32" />
                </a-space>
              </template>
            </Suspense>
          </div>
          <a-divider />
          <div v-if="reviewStatus == 0">
            <h3 class="title">Upload your review comments and make your decision</h3>
            <div class="container">
              <div class="file-upload-container">
                <FileUpload />
              </div>
              <Suspense>
                <SubmitCommentCID :address="$props.address" :paperCID="$props.paperCID" />
                <template #fallback>
                  <a-space size="large">
                    <a-spin :size="32" />
                  </a-space>
                </template>
              </Suspense>
            </div>
          </div>
          <div v-else>
            <a-alert type="warning">You have already submitted your review comments.</a-alert>
          </div>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import FileUpload from '@/components/FileUpload.vue'
import SubmitCommentCID from '../SubmitCommentCID.vue'
import PaperInfo from '@/pages/deSci/PaperInfo.vue'
import { useProvider } from '@/scripts/ethProvider'
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

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

// const provider = new ethers.providers.Web3Provider(window.ethereum);
const { provider, signer } = await useProvider();
const deSciPrint = new ethers.Contract(props.address, DeSciPrint.abi, provider);
const paperCID = ref(props.paperCID)

const yourAddress = ref(signer.getAddress());
const isReviewer = ref(await deSciPrint._isReviewer(paperCID.value, yourAddress.value));

const reviewInfo = ref(await deSciPrint.deSciReviews(paperCID.value, yourAddress.value));
const reviewStatus = ref(reviewInfo.value.reviewerStatus);


</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-align: center;
}
</style>
  