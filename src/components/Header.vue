<template>
  <div class="menu">
    <div class="menu-demo">
      <a-menu mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div>
            <img class="logo" src="../assets/logo.png" alt="logo">
          </div>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="2">Journal Home</a-menu-item>
        <a-menu-item key="3">My Papers</a-menu-item>
      </a-menu>
    </div>
    <div>
      <WalletConnector />
    </div>
  </div>
</template>


<script lang="ts" setup>
import WalletConnector from './WalletConnector.vue'
</script>



<style scoped>
.menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 60px;
  /* background-color: #f2f2f2; */
  padding: 0 20px;
}

.logo {
  width: 50px;
  height: 50px;
  background-color: #000;
}

/* .menu-demo {
  box-sizing: border-box;
  width: 60%;
  align-items: center;
  padding: 20px; 
  background-color: var(--color-neutral-2); 
} */

.menu-demo {
  width: 30%;
  background-color: var(--color-neutral-2);
  align-items: center;
}
</style>
