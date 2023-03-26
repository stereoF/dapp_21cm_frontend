<template>
  <div class="menu">
    <img class="logo" src="../assets/logo.png" alt="logo">
    <div class="menu-items">
      <!-- <div class="menu-item">Home</div> -->
      <router-link class="menu-item" to="/">Home</router-link>
      <div class="menu-item">Journal Home</div>
      <div class="menu-item">My Articles</div>
    </div>
    <div>
      <WalletConnector />
    </div>
  </div>
</template>


<script setup>
import WalletConnector from './WalletConnector.vue'
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
</style>
