<template>
  <div class="common-layout">
    <el-container>
      <el-main>
        <div v-if="!isReviewer" class="text-danger">You are not the reviewer of this paper</div>
        <div v-else>
          <div>
            <Suspense>
              <PaperInfo :address="$props.address" :cid="$props.paperCID"/>
            </Suspense>
          </div>
          <div class="divider"></div>
          <h3 class="title">Upload your review comments and make your decision</h3>
          <div class="container">
            <div class="file-upload-container">
              <FileUpload/>
            </div>
            <SubmitCommentCID :address="$props.address" :paperCID="$props.paperCID"/>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";

import FileUpload from '@/components/FileUpload.vue'
import SubmitCommentCID from './SubmitCommentCID.vue'
import PaperInfo from '@/pages/deSci/PaperInfo.vue'

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

const provider = new ethers.providers.Web3Provider(window.ethereum);
const deSciPrint = new ethers.Contract(props.address, DeSciPrint.abi, provider);
const paperId = ref(props.paperCID)

const yourAddress = ref(await provider.getSigner().getAddress());
const isReviewer = ref(await deSciPrint._isReviewer(paperId.value, yourAddress.value));


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

.divider {
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  width: 100%;
}


</style>
  