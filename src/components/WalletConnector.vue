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
import { ref } from 'vue';

const connected = ref(false);
if (window.ethereum.chainId == '0x13881') {
  connected.value = true;
}

const { switchNetwork } = await useProvider();

async function connectWallet() {
  await switchNetwork();
  setTimeout(() => {
    if (window.ethereum.chainId == '0x13881') {
      connected.value = true;
    }
  }, 1000);
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

/* .balance {
  font-size: 16px;
} */
</style>