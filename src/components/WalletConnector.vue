<template>
    <div>
        <div v-if="!getWalletConnected" class="connect-btn" @click="connectWallet">
          Connect Polygon
        </div>
        <div v-if="getWalletConnected" class="balance">
          Balance: {{balance}} ETH
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ethers } from 'ethers';
import { storeToRefs } from 'pinia';
import { useWalletStore } from '../store/wallet';
import { useProvider } from '@/scripts/ethProvider'

const store = useWalletStore();
const { balance, getWalletConnected } = storeToRefs(store);


async function connectWallet() {
  const { provider, signer, switchNetwork } = await useProvider();
  // const signer = provider.getSigner();
  switchNetwork();
  const address = await signer.getAddress();
  const balanceWei = await provider.getBalance(address);
  
  store.setBalance(parseFloat(ethers.utils.formatEther(balanceWei)));
  store.setAddress(address);

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