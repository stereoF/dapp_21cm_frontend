<template>
  <div class="menu">
    <div>
      <img class="logo" src="../assets/logo.png" alt="logo">
    </div>
    <a-breadcrumb>
      <a-breadcrumb-item>
        <router-link to="/">Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>
        <router-link :to="journalHomeLink">Journal Home</router-link>
      </a-breadcrumb-item>
      <a-breadcrumb-item>detail</a-breadcrumb-item>
    </a-breadcrumb>
    <div>
    <Suspense>
      <WalletConnector />
    </Suspense>
  </div>
</div></template>


<script lang="ts" setup>
import WalletConnector from './WalletConnector.vue'
import { useRoute } from 'vue-router';
import { watch, reactive, ref } from 'vue';
import { useAddress } from '@/store/address';
import { storeToRefs } from 'pinia';

const route = useRoute();
const store = useAddress();
const { address } = storeToRefs(store);
// let address = ref(route.params.address);

let journalHomeLink = reactive(address.value=='' ?  {name: 'home'} : {name: 'desci-journal-home', params: {address: address.value}})

watch(
  () => route.params, (current, previous) => {
    if (typeof(current.address) === 'string') {
      store.setAddress(current.address)
    }
  },
  { deep: true }
)

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

</style>
