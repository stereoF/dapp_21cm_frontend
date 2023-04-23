<template>
  <div class="common-layout">
    <a-layout>
      <a-layout-header>
        <Header />
      </a-layout-header>
      <a-layout-content>
        <div class="container">
          <router-view></router-view>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'

if (!window.ethereum) {
  // If window.ethereum is not found then MetaMask is not installed
  alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>

