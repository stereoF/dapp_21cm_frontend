<template>
    <a-collapse v-for="(result, index) in results" :default-active-key="[0]">
        <a-collapse-item :header="result.statu" :key="index">
            <a-list :style="{ width: `600px` }" :virtualListProps="{
                height: 600,
            }" :data="result.paperListInfoShow">
                <template #item="{ item, index }">
                    <a-list-item :key="index">
                        <router-link
                            :to="{ name: 'desci-paper-info', params: { address: props.address, paperCID: item.paperCID } }">
                            {{ item.title }}
                        </router-link>
                    </a-list-item>
                </template>
            </a-list>
        </a-collapse-item>
    </a-collapse>
</template>

<script lang="ts" setup>
import { ethers } from 'ethers';
import contractABI from "@/contracts/desci/DeSciPrint.json";
import { useProvider } from '@/scripts/ethProvider';
import { usePaperListInfo } from '@/scripts/paperInfo';
import { useStatus } from '@/scripts/status';

const props = defineProps({
    address: {
        type: String,
        required: true,
    },
})

const { ProcessStatus } = useStatus();

const { provider, signer } = await useProvider();
const contract = new ethers.Contract(
    props.address,
    contractABI.abi,
    provider
);

const yourAddress = await signer.getAddress();

let printCnt = await contract.deSciPrintCnt();
let statuIndexList = [5, 1, 0, 4, 7, 2, 3];
let results: any = [];

if (printCnt > 0) {
    for (let i = 0; i < statuIndexList.length; i++) {
        let statuIndex = statuIndexList[i];
        let statu = ProcessStatus[statuIndex];
        let paperList = await contract.getAuthorPapers(yourAddress, statuIndex, 0, printCnt - 1);
        let { paperListInfoShow } = await usePaperListInfo(props.address, paperList)
        results.push({
            statu: statu,
            paperListInfoShow: paperListInfoShow
        })
    }
}

</script>
