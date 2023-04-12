<template>
    <div class="common-layout">
        <a-layout>
            <a-layout-header>
                <h2>Journal: {{ journalName }}</h2>
            </a-layout-header>
            <a-layout-content>
                <div v-if="!isAuthor">
                    <a-alert type="warning">You are not the author of this paper.</a-alert>
                </div>
                <div v-else class="container">
                    <PaperInfo :address="props.address" :paperCID="props.paperCID" ref="paperInfo"/>
                    <a-divider />
                    <a-tabs default-active-key="2">
                        <a-tab-pane key="1" title="Tab 1">
                            <FileUpload />
                        </a-tab-pane>
                        <a-tab-pane key="2" title="Tab 2">
                            <FileUpload />
                        </a-tab-pane>
                    </a-tabs>
                </div>
            </a-layout-content>
        </a-layout>
    </div>
</template>

<script lang="ts" setup>
import { ethers } from "ethers";
import { ref, reactive, onMounted } from 'vue';
import { Notification } from '@arco-design/web-vue';
import { useRouter } from 'vue-router'
import FileUpload from '@/components/FileUpload.vue'
import PaperInfo from "../PaperInfo.vue";
import { useProvider } from '@/scripts/ethProvider'
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
import { usePaperInfo } from "@/scripts/paperInfo";

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

const { provider, signer } = await useProvider();
const router = useRouter()
const deSciPrint = new ethers.Contract(
    props.address,
    DeSciPrint.abi,
    provider
);

let journalName = ref(await deSciPrint.name());
let printInfo = reactive(await deSciPrint.deSciPrints(props.paperCID));

const yourAddress = ref(await signer.getAddress());
const isAuthor = ref(yourAddress.value === printInfo.submitAddress);

const { reviewResultShow } = await usePaperInfo(props.address, props.paperCID);

</script>

<style scoped>
h2 {
    text-align: center;
    /* Add this line to center align h2 */
}
</style>