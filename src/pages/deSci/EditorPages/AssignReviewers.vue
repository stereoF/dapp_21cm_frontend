<template>
    <div class="container">
        <!-- Title -->
        <h2>Journal name: {{ journalName }}</h2>
        <!-- <h5>Paper Title: {{ paperInfo.keyInfo }}</h5>
      <h5>Paper CID: {{ paperId }}</h5> -->
        <div>
            <Suspense>
                <PaperInfo :address="$props.address" :paperCID="$props.paperId" />
                <template #fallback>
                    <a-space size="large">
                        <a-spin :size="32" />
                    </a-space>
                </template>
            </Suspense>
        </div>
        <a-divider />
        <div v-if="!isEditor">
            <a-alert type="warning">You are not the editor of this journal.</a-alert>
        </div>
        <div v-else>
            <a-tabs default-active-key="1">
                <a-tab-pane key="1" title="Assign the reviewers">
                    <ManagerFields field-name="Reviewer" :fields="reviewers.map((reviewer: any) => ({ field: reviewer }))"
                        @submit="contractCall" />
                </a-tab-pane>
                <a-tab-pane key="2" title="Reject or Pass">
                    <div class="container">
                        <div class="file-upload-container">
                            <a-col :offset="8">
                                <FileUpload />
                            </a-col>
                        </div>
                        <Suspense>
                            <SubmitCommentCID :address="$props.address" :paperCID="$props.paperId" disable-revise/>
                            <template #fallback>
                                <a-space size="large">
                                    <a-spin :size="32" />
                                </a-space>
                            </template>
                        </Suspense>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ethers } from "ethers";
import { Notification } from '@arco-design/web-vue';
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import ManagerFields from '@/components/ManagerFields.vue';
import SubmitCommentCID from '../ReviewerPages/SubmitCommentCID.vue';
import FileUpload from '@/components/FileUpload.vue';
import PaperInfo from '@/pages/deSci/PaperInfo.vue';
import { useProvider } from '@/scripts/ethProvider';
import { useRouter } from 'vue-router'


export default defineComponent({
    name: "AssignReviewers",
    props: {
        address: {
            type: String,
            required: true
        },
        paperId: {
            type: String,
            required: true
        },
    },
    async setup(props) {
        const router = useRouter();
        const { provider, signer } = await useProvider();
        const deSciPrint = new ethers.Contract(props.address, DeSciPrint.abi, provider);
        const paperId = ref(props.paperId)
        const editors = reactive(await deSciPrint.editors());

        const journalName = ref(await deSciPrint.name());
        const reviewers = reactive(await deSciPrint.getReviewers(paperId.value));

        let process = reactive(await deSciPrint.deSciProcess(props.paperId));

        const yourAddress = ref(await signer.getAddress());
        const isEditor = ref(editors.includes(yourAddress.value));


        const contractCall = async (data: any) => {
            let reviewersFromField = data.fields.map((field: any) => field.field);
            let intersection = reviewers.filter((v: any) => reviewersFromField.includes(v));
            let submitList = reviewersFromField.filter((v: any) => !intersection.includes(v));
            let removeList = reviewers.filter((v: any) => !intersection.includes(v));

            try {
                if (submitList.length == 0 && removeList.length == 0) {
                    Notification.info({
                        title: 'No change',
                        content: 'You have not changed the reviewers.',
                    });
                    return;
                }

                if (submitList.length > 0) {
                    await deSciPrint.connect(signer).reviewerAssign(paperId.value, submitList);
                };

                if (removeList.length > 0) {
                    await deSciPrint.connect(signer).removeReviewer(paperId.value, removeList);
                };

                router.push({
                    name: 'success-submit',
                    query: {
                        title: 'You have successfully assigned reviewers to this paper!',
                        subtitle: ' It may take a few minutes for the blockchain to package the transaction, \
          so please wait a moment before confirming whether the reviewers has changed.'
                    }
                });

            } catch (error: any) {
                console.error(error);
                Notification.error({
                    title: 'Submit Failed',
                    content: error.message,
                });
            }

        };

        return {
            journalName,
            contractCall,
            reviewers,
            isEditor,
            process
        };
    },
    components: { ManagerFields, PaperInfo, IconExclamationCircleFill, SubmitCommentCID, FileUpload }
})

</script>

<style scoped>
h2 {
    text-align: center;
    /* Add this line to center align h2 */
}
</style>