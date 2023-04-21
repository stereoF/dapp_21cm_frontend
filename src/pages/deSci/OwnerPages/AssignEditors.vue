<template>
    <div class="container">
        <!-- Title -->
        <h1>Admin Page of Journal: {{ title }}</h1>
        <br/>
        <h4>Gas Fee</h4>
        <ul>
            <li v-for="(g, i) in gasFee">{{ gasFeeLable[i] }}: {{ g }} MATIC</li>
        </ul>
        <a-divider />
        <h4>Bonus Weight: </h4>
        <ul>
            <li v-for="(w, i) in bonusWeight">{{ bonusWeightLable[i] }}: {{ w }}</li>
        </ul>
        <div v-if="!isOwner">
            <a-alert type="warning">You are not the owner of this journal.</a-alert>
        </div>
        <div v-else>
            <a-divider />
            <h4>Set Gas Fee</h4>
            <a-form :model="feeForm" @submit-success="handleFeeSubmit" @submit-failed="handleSubmitFailed">
                <a-form-item field="index" tooltip="Please enter index" label="index">
                    <a-input-number v-model="feeForm.index" :max="4" :min="0" placeholder="please enter the index..." />
                </a-form-item>
                <a-form-item field="value" label="value">
                    <a-input-number v-model="feeForm.value" :precision="0.00001" :step="0.00001" :min="0"
                        placeholder="please enter the value..." />
                </a-form-item>
                <a-form-item extra="click to update value">
                    <a-button html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
            <a-divider />
            <h4>Set Bonus Weight</h4>
            <a-form :model="bonusForm" @submit-success="handleBonusSubmit" @submit-failed="handleSubmitFailed">
                <a-form-item field="index" tooltip="Please enter index" label="index">
                    <a-input-number v-model="bonusForm.index" :max="8" :min="0" placeholder="please enter the index..." />
                </a-form-item>
                <a-form-item field="value" label="value">
                    <a-input-number v-model="bonusForm.value" :min="0"
                        placeholder="please enter the value..." />
                </a-form-item>
                <a-form-item extra="click to update value">
                    <a-button html-type="submit">Submit</a-button>
                </a-form-item>
            </a-form>
            <a-divider />
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

        let gasFeeLable = ['minGasCost', 'editorActGas', 'reviewerActGas', 'minWithdrawValue', 'minDonate']
        let gasFee = await Promise.all(gasFeeLable.map(async (lable: any) => {
            return ethers.utils.formatEther((await deSciPrint.gasFee(gasFeeLable.indexOf(lable))).toString());
        }));

        let bonusWeight = await deSciPrint.bonusWeight();
        let bonusWeightLable = ['reviewerPass', 'reviewerRevise', 'reviewerReject', 'reviewerAssign', 'reviewerAppend', 'reviewerRemove', 'editorReject',
            'published', 'contractTakeRate']

        const feeForm = reactive(
            {
                index: 0,
                value: 1,
            }
        );

        const bonusForm = reactive(
            {
                index: 0,
                value: 1,
            }
        );
        

        const handleFeeSubmit = async (data: any) => {
            try {
                await deSciPrint.connect(signer).setGasFee(ethers.utils.parseEther(data.value.toString()), data.index);
                router.push({
                    name: 'success-submit',
                    query: {
                        title: 'You have successfully update new value!',
                        subtitle: ' It may take a few minutes for the blockchain to package the transaction, \
                                    so please wait a moment before confirmation'
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

        const handleBonusSubmit = async (data: any) => {
            try {
                await deSciPrint.connect(signer).setBonusWeight(data.value, data.index);
                router.push({
                    name: 'success-submit',
                    query: {
                        title: 'You have successfully update new value!',
                        subtitle: ' It may take a few minutes for the blockchain to package the transaction, \
                                    so please wait a moment before confirmation'
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

        const handleSubmitFailed = async () => {
            Notification.warning({
                title: 'warning',
                content: 'Please check your input'
            })

        };

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
            gasFee,
            gasFeeLable,
            feeForm,
            handleFeeSubmit,
            handleSubmitFailed,
            bonusWeight,
            bonusWeightLable,
            handleBonusSubmit,
            bonusForm
        };
    },
    components: { ManagerFields, IconExclamationCircleFill }
})

</script>