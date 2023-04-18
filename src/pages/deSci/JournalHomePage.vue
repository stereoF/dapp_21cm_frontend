<template>
    <a-layout style="width: 1000px">
        <a-layout-header>
            <br />
            <h4 style="text-align: center">{{ journalName }}</h4>
            <br />
        </a-layout-header>
        <a-layout>
            <a-layout-sider style="width: 300px">
                <div class="menu-demo">
                    <a-menu>
                        <a-menu-item>Published</a-menu-item>
                        <a-menu-item>Author's Page</a-menu-item>
                        <a-menu-item>Reviewer's Page</a-menu-item>
                        <a-menu-item>Editor's Page</a-menu-item>
                    </a-menu>
                </div>
            </a-layout-sider>
            <a-layout-content>
                <Suspense>
                    <router-view></router-view>
                </Suspense>
                <!-- <a-list>
                    <a-list-item v-for="paper in paperListInfoShow">
                        <router-link
                            :to="{ name: 'desci-paper-info', params: { address: props.address, paperCID: paper.paperCID } }">
                            {{ paper.title }}
                        </router-link>
                    </a-list-item>
                </a-list> -->
            </a-layout-content>
        </a-layout>
    </a-layout>
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

let journalName = await contract.name();

// let printCnt = await contract.deSciPrintCnt();

// let paperPublished: any = [];
// if (printCnt > 0) {
//     paperPublished = await contract.printsPool(7, 0, printCnt - 1);
// }

// const { paperListInfoShow } = await usePaperListInfo(props.address, paperPublished);

</script>

<style scoped>
.menu-demo {
    box-sizing: border-box;
    width: 100%;
    /* padding: 40px; */
    background-color: #273664;
}
</style>
