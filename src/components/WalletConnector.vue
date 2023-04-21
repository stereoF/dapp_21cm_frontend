<template>
  <div>
    <div v-if="!connected" class="connect-btn" @click="connectWallet">
      Connect Polygon
    </div>
    <div v-else>
      Polygon Connected
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useProvider } from '@/scripts/ethProvider'
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const VITE_CHAIN_ID = import.meta.env.VITE_CHAIN_ID;


const route = useRoute();

const connected = ref(false);
if (window.ethereum.chainId === VITE_CHAIN_ID) {
  connected.value = true;
}

const { switchNetwork } = await useProvider();

async function connectWallet() {
  await switchNetwork();
  // setTimeout(() => {
  //   if (window.ethereum.chainId === VITE_CHAIN_ID) {
  //     connected.value = true;
  //   }
  // }, 1000);
  let pollCount = 0;
  const pollInterval = setInterval(() => {
    pollCount++;
    // Check the status of the asynchronous function here
    if (pollCount >= 10 || window.ethereum.chainId === VITE_CHAIN_ID) {
      clearInterval(pollInterval);
      if (window.ethereum.chainId === VITE_CHAIN_ID) {
        connected.value = true;
      }
    }
  }, 1000);
}


watch(
  () => route, (current, previous) => {
    if (window.ethereum.chainId === VITE_CHAIN_ID) {
      connected.value = true;
    } else {
      connected.value = false;
    }
  },
  { deep: true }
)


</script>

<style scoped>
.connect-btn {
  background-color: #00aaff;
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 16px;
  cursor: pointer;
}

/* .balance {
  font-size: 16px;
} */
</style>