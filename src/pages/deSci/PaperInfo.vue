<template>
  <a-space direction="vertical" size="large" fill>
    <a-descriptions :data="basicInfo" title="Basic Info" />
    <a-collapse>
      <a-collapse-item header="Web3 Information Related to this paper" key="1">
        <a-descriptions :data="web3Info" title="Web3 Info" />
      </a-collapse-item>
    </a-collapse>
  </a-space>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue';
import { ethers } from "ethers";
import { useProvider } from '@/scripts/ethProvider'
import contractABI from "@/contracts/desci/DeSciPrint.json";
import { useStatus } from '@/scripts/status';

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
// const provider = new ethers.providers.Web3Provider(window.ethereum);
const contract = new ethers.Contract(
  props.address,
  contractABI.abi,
  provider
);
const { ProcessStatus } = useStatus();


let printInfo = await contract.deSciPrints(props.paperCID);
let process = await contract.deSciProcess(props.paperCID);
let reviewers = await contract.getReviewers(props.paperCID);
let processIndex: number = process.processStatus;

let reviewerCnt = reviewers.length;
let reviewInfo = reviewers.map(async (reviewer: string, index: number) => {
  return {
    reviewer: reviewer,
    ...await(contract.deSciReviews(props.paperCID, reviewer)),
  }
  // return {
  //   reviewer: await contract.deSciReviews(props.paperCID, reviewer),
  // }
})

let reviseCnt = 0;
let passCnt = 0;
let rejectCnt = 0;
let replyCnt = 0;
let reviewResult = await Promise.all(reviewInfo);

for (let i = 0; i < reviewResult.length; i++) {
  if (reviewResult[i].reviewerStatus === 1) {
    reviseCnt++;
  } else if (reviewResult[i].reviewerStatus === 3) {
    passCnt++;
  } else if (reviewResult[i].reviewerStatus === 2) {
    rejectCnt++;
  }

  if (reviewResult[i].reply !== '') {
    replyCnt++;
  }
}

reviewers = reactive(reviewers ? reviewers : []);
let status = ProcessStatus[processIndex];

const basicInfo = [
  {
    label: 'Title',
    value: printInfo.keyInfo,
  },
  {
    label: 'Status',
    value: status
  },
  {
    label: 'Submit Time',
    value: printInfo.submitTime ? new Date(printInfo.submitTime * 1000).toLocaleString() : '',
  },
  {
    label: 'Number of Reviewers',
    value: reviewerCnt,
  },
  {
    label: 'Number of Revise',
    value: reviseCnt,
  },
  {
    label: 'Number of Pass',
    value: passCnt,
  },
  {
    label: 'Number of Reject',
    value: rejectCnt,
  },
  {
    label: 'Number of Reply',
    value: replyCnt,
  },
]

const web3Info = [
  {
    label: 'Paper CID',
    value: props.paperCID,
  },
  {
    label: 'Submitted by',
    value: printInfo.submitAddress,
  },
  {
    label: 'Editor',
    value: process.editor === ethers.constants.AddressZero ? '' : process.editor,
  },
  {
    label: 'Reviewers',
    value: reviewers.join(', '),
  }
]

</script>