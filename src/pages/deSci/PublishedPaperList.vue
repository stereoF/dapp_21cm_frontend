<template>
    <a-list :style="{ width: `800px` }" :virtualListProps="{
        height: 600,
    }" :data="paperListInfoShow">
        <template #header>
            Published Papers
        </template>

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
