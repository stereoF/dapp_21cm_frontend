<template>
    <a-form :model="form" @submit="contractCall">
        <a-form-item>
            <a-space direction="horizontal" :style="{ width: '100%' }">
                <a-input :style="{ width: '450px' }" v-model="cid" placeholder="Select directory to get CID" />
                <a-select v-model="form.value" class="m-2" placeholder="Select" size="large">
                    <a-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
                </a-select>
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
        },
        disableRevise: {
            type: Boolean,
            required: false
        }
    },
    async setup(props) {
        const router = useRouter();
        const store = useUploadStore();
        const form = reactive({
            value: 1,
        })
        const { cid } = storeToRefs(store);
        const options = [
            {
                value: 1,
                label: 'revise',
                disabled: props.disableRevise
            },
            {
                value: 2,
                label: 'reject',
                disabled: false
            },
            {
                value: 3,
                label: 'pass',
                disabled: false
            },
        ]

        const { provider, signer } = await useProvider();

        const deSciPrint = new ethers.Contract(
            props.address,
            DeSciPrint.abi,
            provider
        );

        const deSciPrintWithSigner = deSciPrint.connect(signer);

        const contractCall = async () => {
            try {
                await deSciPrintWithSigner.reviewPrint(props.paperCID, cid.value, form.value);
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

        return {
            contractCall,
            options,
            form,
            cid
        };
    },
});
</script>