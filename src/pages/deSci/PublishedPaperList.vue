<template>
    <a-list>
        <template #header>
            Published Papers
        </template>
        <a-list-item v-for="paper in paperListInfoShow">
            <router-link :to="{ name: 'desci-paper-info', params: { address: props.address, paperCID: paper.paperCID } }">
                {{ paper.title }}
            </router-link>
        </a-list-item>
    </a-list>
</template>

<script lang="ts" setup>
import { ethers } from 'ethers';
import contractABI from "@/contracts/desci/DeSciPrint.json";
import { useProvider } from '@/scripts/ethProvider';
import { usePaperListInfo } from '@/scripts/paperInfo';

const props = defineProps({
    address: {
        type: String,
        required: true,
    },
})

const { provider } = await useProvider();
const contract = new ethers.Contract(
    props.address,
    contractABI.abi,
    provider
);


let printCnt = await contract.deSciPrintCnt();

let paperPublished: any = [];
if (printCnt > 0) {
    paperPublished = await contract.printsPool(7, 0, printCnt - 1);
}

const { paperListInfoShow } = await usePaperListInfo(props.address, paperPublished);

</script>
