<template>
    <div style="margin-left: 40px;">
        <p>Your Balance: {{ balanceEther }} MATIC</p>
        <p>Minimum withdrawal amount: {{ minWithdrawValueEther }} MATIC</p>
        <a-button type="primary" :disabled="balance<minWithdrawValue" @click="withdrawAll">Withdraw All</a-button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ethers } from 'ethers';
import contractABI from "@/contracts/desci/DeSciPrint.json";
import { useProvider } from '@/scripts/ethProvider';

const props = defineProps({
    address: {
        type: String,
        required: true,
    },
})

const { provider, signer } = await useProvider();
const yourAddress = await signer.getAddress();
const contract = new ethers.Contract(
    props.address,
    contractABI.abi,
    provider
);

const minWithdrawValue = ref(await contract.gasFee(3));
let minWithdrawValueEther = ethers.utils.formatEther(minWithdrawValue.value.toString());

const balance = ref(await contract.tokenBalance(yourAddress));
let balanceEther = ethers.utils.formatEther(balance.value.toString());

const withdrawAll = async () => {
    await contract.connect(signer).withdrawToken();
}

</script>