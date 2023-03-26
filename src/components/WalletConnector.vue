<template>
    <div>
        <div v-if="!getWalletConnected" class="connect-btn" @click="connectWallet">
          Connect Wallet
        </div>
        <div v-if="getWalletConnected" class="balance">
          Balance: {{balance}} ETH
        </div>
    </div>
</template>

<script setup>
import { ethers } from 'ethers';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../store/wallet';

const store = useWalletStore();
const { balance, getWalletConnected } = storeToRefs(store);


async function connectWallet() {
    if (window.ethereum !== 'undefined') {
        try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        const balanceWei = await provider.getBalance(address);
        
        store.setBalance(ethers.utils.formatEther(balanceWei));
        store.setAddress(address);

        } catch (error) {
        console.error(error);
        }
    } else {
        console.error('No web3 wallet detected');
    }
}

</script>

<style scoped>
.connect-btn {
    background-color: #00aaff;
    color: #ffffff;
    padding: 8px 16px;
    border-radius: 16px;
    cursor: pointer;
  }
  
.balance {
  font-size: 16px;
}

</style>