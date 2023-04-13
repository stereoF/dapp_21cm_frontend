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
                    <PaperInfo :address="props.address" :paperCID="props.paperCID" ref="paperInfo" />
                    <a-divider />
                    <h3>Choose the reviewer comment you want to reply</h3>
                    <a-tabs default-active-key="1">
                        <a-tab-pane v-for="(result, index) in reviewResultShow" :key="index" :title="result.name">
                            <a-split
                                :style="{ height: '600px', width: '100%', minWidth: '500px', border: '1px solid var(--color-border)' }"
                                v-model:size="size" min="80px">
                                <template #first>
                                    <a-descriptions :data="result.obj" size="large" title="Review Info" :column="1" />
                                </template>
                                <template #second>
                                        <a-form :model="form" @submit="contractCall(index)">
                                            <br/>
                                            <a-form-item>
                                                <FileUpload />
                                            </a-form-item>
                                            <a-form-item>
                                                <a-input :style="{ width: '450px' }" v-model="form.cid"
                                                    placeholder="Select directory to get CID" />
                                                <a-button html-type="submit">Submit</a-button>
                                            </a-form-item>
                                        </a-form>
                                </template>
                            </a-split>
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
import { storeToRefs } from 'pinia';
import { useUploadStore } from '@/store/upload';


let size = ref(0.3)

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


const store = useUploadStore();
const { cid } = storeToRefs(store);

const form = reactive({
    cid: cid,
})

const { provider, signer } = await useProvider();
const router = useRouter()
const deSciPrint = new ethers.Contract(
    props.address,
    DeSciPrint.abi,
    provider
);
const deSciPrintWithSigner = deSciPrint.connect(signer);

let journalName = ref(await deSciPrint.name());
let printInfo = reactive(await deSciPrint.deSciPrints(props.paperCID));

const yourAddress = ref(await signer.getAddress());
const isAuthor = ref(yourAddress.value === printInfo.submitAddress);

const { reviewResultShow } = await usePaperInfo(props.address, props.paperCID);

const contractCall = async (index: number) => {
    try {
        let reviewerAddress = reviewResultShow[index].name;
        await deSciPrintWithSigner.replyReviewInfo(props.paperCID, reviewerAddress, cid.value);
        // Notification.success({
        //     title: 'Succeed',
        //     content: 'You successfully submit your comment',
        // })
        router.push({
            name: 'success-submit',
            query: {
                title: 'You have successfully submitted your comment',
                subtitle: ' It may take a few minutes for the blockchain to package the transaction containing your paper, \
              so please wait a moment before confirming whether your comment appears on the blockchain.'
            }
        });
    } catch (error) {
        console.error(error);
        Notification.success({
            title: 'Failed!',
            content: 'You failed to submit your comment',
        })
    } finally {
        cid.value = '';
    }
};

</script>

<style scoped>
h2,h3 {
    text-align: center;
    /* Add this line to center align h2 */
}
</style>