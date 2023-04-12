<template>
    <div class="container">
        <!-- Title -->
        <h1>Manager the editors of journal: {{ title }}</h1>
        <div v-if="!isOwner">
            <a-alert type="warning">You are not the owner of this journal.</a-alert>
        </div>
        <div v-else>
            <ManagerFields field-name="Editor" :fields="editors.map((editor: any) => ({ field: editor }))"
                @submit="contractCall" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ethers } from "ethers";
import { Notification } from '@arco-design/web-vue';
import { useRouter } from 'vue-router'
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import ManagerFields from '@/components/ManagerFields.vue';
import { useProvider } from '@/scripts/ethProvider'
import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

export default defineComponent({
    name: "AssignEditors",
    props: {
        address: {
            type: String,
            required: true
        },
    },
    async setup(props) {
        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const router = useRouter();
        const { provider, signer } = await useProvider();

        const deSciPrint = new ethers.Contract(props.address, DeSciPrint.abi, provider);
        const title = ref(await deSciPrint.name());
        const editors = reactive(await deSciPrint.editors());

        const yourAddress = ref(await signer.getAddress());
        const isOwner = ref(await deSciPrint.owner() === yourAddress.value);
        // const isOwner = computed(async () => (await deSciPrint.owner()) === yourAddress.value);

        const contractCall = async (data: any) => {
            let editorsFromField = data.fields.map((field: any) => field.field);
            let intersection = editors.filter((v: any) => editorsFromField.includes(v));
            let submitList = editorsFromField.filter((v: any) => !intersection.includes(v));
            let removeList = editors.filter((v: any) => !intersection.includes(v));

            try {

                if (submitList.length == 0 && removeList.length == 0) {
                    Notification.warning({
                        title: 'No changes detected',
                        content: 'Please make changes to the editors before submitting.',
                    });
                    return;
                }

                if (submitList.length > 0) {
                    await deSciPrint.connect(signer).pushEditors(submitList);
                };

                if (removeList.length > 0) {
                    await deSciPrint.connect(signer).removeEditor(removeList);
                };

                router.push({
                    name: 'success-submit',
                    query: {
                        title: 'You have successfully assigned editors to your journal!',
                        subtitle: ' It may take a few minutes for the blockchain to package the transaction, \
                                    so please wait a moment before confirming whether the editors has changed.'
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
            title,
            contractCall,
            editors,
            isOwner,
        };
    },
    components: { ManagerFields, IconExclamationCircleFill }
})

</script>