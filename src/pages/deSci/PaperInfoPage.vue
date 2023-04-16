<template>
    <Suspense>
        <PaperInfo :address="address" :paperCID="paperCID" />
    </Suspense>
    <router-link v-if="journalEditors.includes(yourAddress)"
        :to="{ name: 'desci-assign-reviewer-paper', params: { address: props.address, paperId: props.paperCID } }">
        Process this paper as an editor
    </router-link>
    <router-link v-if="reviewers.includes(yourAddress)"
        :to="{ name: 'desci-review-paper', params: { address: props.address, paperCID: props.paperCID } }">
        Process this paper as a reviewer
    </router-link>
    <div v-if="web3Info[1].value === yourAddress">
        <a-space direction="vertical">
            <a-row>
                <router-link
                    :to="{ name: 'desci-reply-comment', params: { address: props.address, paperCID: props.paperCID } }">
                    Reply the reviewers' comments as the author
                </router-link>
            </a-row>
            <a-row>
                <router-link :to="{ name: 'desci-replynew', params: { address: props.address, prevCID: props.paperCID } }">
                    Submit the revised paper
                </router-link>
            </a-row>
        </a-space>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import PaperInfo from '@/pages/deSci/PaperInfo.vue';
import { usePaperInfo } from '@/scripts/paperInfo';
import { useProvider } from '@/scripts/ethProvider';

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

const { signer } = await useProvider();
const yourAddress = ref(await signer.getAddress());

const { web3Info, journalEditors, reviewers } = await usePaperInfo(props.address, props.paperCID);

// let canShowEditorPage = false;
// if (["Pending", "AppendReviewer"].includes(basicInfo[1].value) && (paperEditor === '' || paperEditor === props.address) && journalEditors.includes(props.address)) {
//   canShowEditorPage = true;
// }

</script>