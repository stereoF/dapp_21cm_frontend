<template>
  <div class="menu">
    <img class="logo" src="../assets/logo.png" alt="logo">
    <div class="menu-items">
      <div class="menu-item">Home</div>
      <div class="menu-item">Journal Home</div>
      <div class="menu-item">My Articles</div>
    </div>
      <div v-if="!walletConnected" class="connect-btn" @click="connectWallet">
          Connect Wallet
      </div>
      <div v-if="walletConnected" class="balance">
          Balance: {{balance}} ETH
      </div>
  </div>
</template>


<script setup>
import { ref } from 'vue'
import { ethers } from 'ethers';

const walletConnected = ref(false);
const balance = ref('0')


async function connectWallet() {
        if (window.ethereum !== 'undefined') {
          try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const address = await signer.getAddress();
            const balanceWei = await provider.getBalance(address);
            balance.value = ethers.utils.formatEther(balanceWei);
            walletConnected.value = true;
          } catch (error) {
            console.error(error);
          }
        } else {
          console.error('No web3 wallet detected');
        }
      }

</script>



<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  background-color: #f2f2f2;
  padding: 0 20px;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: #000;
}

.menu-items {
  display: flex;
  gap: 20px;
}

.menu-item {
  font-size: 16px;
  color: #000;
  cursor: pointer;
}
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
