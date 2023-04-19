<template>
    <a-collapse :default-active-key="['waiting']">
        <a-collapse-item header="Waiting for your process" key="waiting">
            <a-list :style="{ width: `800px` }" :virtualListProps="{
                height: 200,
            }" :data="paperWaitingShow">
                <template #item="{ item, index }">
                    <a-list-item :key="index">
                        <!-- <router-link
                            :to="{ name: 'desci-paper-info', params: { address: props.address, paperCID: item.paperCID } }">
                            {{ item.title }}
                        </router-link> -->
                        <div>
                            <a-card :style="{ width: '600px' }" :title="item.title">
                                <template #extra>
                                    <router-link
                                        :to="{ name: 'desci-paper-info', params: { address: props.address, paperCID: item.paperCID } }">
                                        more
                                    </router-link>
                                </template>
                                {{ item.abstract.substring(0, 300) }}{{ item.abstract.length > 300 ? '...' : '' }}
                            </a-card>
                        </div>
                    </a-list-item>
                </template>
            </a-list>
        </a-collapse-item>
        <a-collapse-item v-for="(result, index) in results" :header="result.statu" :key="index">
            <a-list :style="{ width: `800px` }" :virtualListProps="{
                height: 600,
            }" :data="result.paperListInfoShow">
                <template #item="{ item, index }">
                    <a-list-item :key="index">
                        <!-- <router-link
                            :to="{ name: 'desci-paper-info', params: { address: props.address, paperCID: item.paperCID } }">
                            {{ item.title }}
                        </router-link> -->
                        <div>
                            <a-card :style="{ width: '600px' }" :title="item.title">
                                <template #extra>
                                    <router-link
                                        :to="{ name: 'desci-paper-info', params: { address: props.address, paperCID: item.paperCID } }">
                                        more
                                    </router-link>
                                </template>
                                {{ item.abstract.substring(0, 300) }}{{ item.abstract.length > 300 ? '...' : '' }}
                            </a-card>
                        </div>
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
let statuIndexList = [1, 3, 4, 5, 7];
let results: any = [];

if (printCnt > 0) {
    for (let i = 0; i < statuIndexList.length; i++) {
        let statuIndex = statuIndexList[i];
        let statu = ProcessStatus[statuIndex];
        let paperList = await contract.getReviewerPapers(yourAddress, statuIndex, 0, printCnt - 1);
        let { paperListInfoShow } = await usePaperListInfo(props.address, paperList)
        results.push({
            statu: statu,
            paperListInfoShow: paperListInfoShow
        })
    }
}

let paperReviewList = await contract.getReviewerPapers(yourAddress, 1, 0, printCnt - 1);
let paperWaitingList = paperReviewList.filter(async (paperCID: string) => {
    let paperReviewInfo = await contract.deSciReviews(paperCID, yourAddress);
    return paperReviewInfo == 0;
});
let { paperListInfoShow } = await usePaperListInfo(props.address, paperWaitingList);
let paperWaitingShow = paperListInfoShow;

</script>