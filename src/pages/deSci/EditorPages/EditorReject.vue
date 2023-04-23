<template>
    <a-form :model="form" @submit="contractCall">
        <a-form-item>
            <a-space direction="horizontal" :style="{ width: '100%' }">
                <a-input :style="{ width: '450px' }" v-model="form.cid" placeholder="Select directory to get CID" />
                <a-button html-type="submit">Submit</a-button>
            </a-space>
        </a-form-item>
    </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ethers } from "ethers";
import { Notification } from '@arco-design/web-vue';
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import { storeToRefs } from 'pinia';
import { useUploadStore } from '@/store/upload';
import { useProvider } from '@/scripts/ethProvider';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'SubmitCommentCID',
    props: {
        address: {
            type: String,
            required: true,
        },
        paperCID: {
            type: String,
            required: true,
        }
    },
    async setup(props) {
        const router = useRouter();
        const store = useUploadStore();
        const { cid } = storeToRefs(store);
        const form = reactive({
            cid: cid
        })

        const { provider, signer } = await useProvider();

        const deSciPrint = new ethers.Contract(
            props.address,
            DeSciPrint.abi,
            provider
        );

        const deSciPrintWithSigner = deSciPrint.connect(signer);

        const contractCall = async () => {
            try {
                console.log('cid', form.cid);
                await deSciPrintWithSigner.editorReject(props.paperCID, form.cid);
                router.push({
                    name: 'success-submit',
                    query: {
                        title: 'You have successfully rejected this paper and submitted your comment',
                        subtitle: ' It may take a few minutes for the blockchain to package the transaction containing your paper, \
              so please wait a moment before confirming whether your comment appears on the blockchain.'
                    }
                });
            } catch (error) {
                console.error(error);
                Notification.success({
                    title: 'Failed!',
                    content: 'You failed to reject this paper',
                })
            } finally {
                cid.value = '';
            }
        };

        return {
            contractCall,
            form,
            cid
        };
    },
});
</script>