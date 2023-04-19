<template>
  <div class="container">
    <br/>
    <h4>Pre-Print Journals</h4>
    <!-- <router-link to="/" v-for="(journal, index) in prePrints" :key="index">
      {{ journal.name }}
    </router-link> -->
    <router-link :to="{ name: 'preprint-journal-published', params: { address: journal.address}}" v-for="(journal, index) in prePrints" :key="index">
      {{ journal.name }}
    </router-link>
    <br/>
    <h4>DeSci Journals</h4>
    <router-link :to="{ name: 'desci-journal-published', params: { address: journal.address}}" v-for="(journal, index) in desSciJournals" :key="index">
      {{ journal.name }}
    </router-link>
  </div>
</template>
  
<script lang="ts" setup>
import prePrints from '@/contracts/preprint/contract-address.json';
import desSciJournals from '@/contracts/desci/contract-address.json';
</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
