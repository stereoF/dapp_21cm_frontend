<template>
    <a-typography>
        <a-typography-title>
            {{ printInfo.keyInfo }}
        </a-typography-title>
        <a-typography-paragraph>
            <ul>
                <li>
                    Paper CID: {{ props.paperCID }}                   
                </li>
                <li>
                    Submitted by: {{ printInfo.submitAddress }}
                </li>
                <li>
                    Submit Time: {{ printInfo.submitTime ? new Date(printInfo.submitTime * 1000).toLocaleString() : '' }}
                </li>
                <li>
                    Editor: {{ process.editor === ethers.constants.AddressZero ? '' : process.editor }}
                </li>
                <li>
                    Reviewers: {{ reviewers.join(', ') }}
                </li>
                <li>
                    Status: {{ status }}
                </li>
            </ul>
        </a-typography-paragraph>
</a-typography>
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

    let printInfo = reactive(await contract.deSciPrints(props.paperCID));
    let process = reactive(await contract.deSciProcess(props.paperCID));
    let reviewers = await contract.getReviewers(props.paperCID);
    let processIndex: number = process.processStatus;

    reviewers =  reactive(reviewers ? reviewers : []);
    let status = ref(ProcessStatus[processIndex]);
</script>