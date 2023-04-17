<template>
    <Suspense>
        <PaperInfo :address="address" :paperCID="paperCID" />
    </Suspense>
    <a-list>
        <a-list-item v-if="journalEditors.includes(yourAddress)">
            <router-link
                :to="{ name: 'desci-assign-reviewer-paper', params: { address: props.address, paperCID: props.paperCID } }">
                Process this paper as an editor
            </router-link>
        </a-list-item>
        <a-list-item v-if="reviewers.includes(yourAddress)">
            <router-link
                :to="{ name: 'desci-review-paper', params: { address: props.address, paperCID: props.paperCID } }">
                Process this paper as a reviewer
            </router-link>
        </a-list-item>
        <a-list-item v-if="web3Info[1].value === yourAddress">
            <router-link
                :to="{ name: 'desci-reply-comment', params: { address: props.address, paperCID: props.paperCID } }">
                Reply the reviewers' comments as the author
            </router-link>
        </a-list-item>
        <a-list-item v-if="web3Info[1].value === yourAddress">
            <router-link :to="{ name: 'desci-replynew', params: { address: props.address, prevCID: props.paperCID } }">
                Submit the revised paper
            </router-link>
        </a-list-item>
    </a-list>
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