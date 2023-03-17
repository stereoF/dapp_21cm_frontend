<template>
    <div class="container">
      <div class="header">
        <div class="logo">My Logo</div>
        <div v-if="!walletConnected" class="connect-btn" @click="connectWallet">
          Connect Wallet
        </div>
        <div v-if="walletConnected" class="balance">
          Balance: {{balance}} ETH
        </div>
      </div>
      <div class="content">
        <div v-if="walletConnected" class="subscription">
          <h2>Subscriptions</h2>
          <ul>
            <li v-for="(item, index) in subscriptions" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="recommendation">
          <h2>Recommendations</h2>
          <ul>
            <li v-for="(item, index) in recommendations" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { ethers } from 'ethers';
  
  export default defineComponent({
    name: 'MyComponent',
    setup() {
      const walletConnected = ref(false);
      const balance = ref('0');
      const subscriptions = ref(['Subscription 1', 'Subscription 2']);
      const recommendations = ref([
        'Recommendation 1',
        'Recommendation 2',
        'Recommendation 3',
      ]);
  
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
  
      return {
        walletConnected,
        balance,
        subscriptions,
        recommendations,
        connectWallet,
      };
    },
  });
  </script>
  
<style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 16px;
  }
  
  .logo {
    font-size: 24px;
    font-weight: bold;
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
  
  .content {
    display: flex;
    flex-direction: column; /* Updated */
    justify-content: center;
    align-items: center;
    width: 100%;
    padding: 32px;
  }
  
  .subscription,
  .recommendation {
    margin: 0 16px;
    width: 100%; /* Added */
    max-width: 600px; /* Added */
    padding: 16px; /* Added */
    background-color: #f8f8f8; /* Added */
    border-radius: 8px; /* Added */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1); /* Added */
  }
  
  .subscription {
    margin-bottom: 16px; /* Added */
  }
  
  .subscription h2,
  .recommendation h2 {
    font-size: 24px;
    font-weight: bold;
    margin-bottom: 16px;
  }
  
  .subscription ul,
  .recommendation ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .subscription li,
  .recommendation li {
    margin-bottom: 8px;
  }
</style>
