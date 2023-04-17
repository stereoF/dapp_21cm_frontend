<template>
  <div class="container">
    <br/>
    <h4>Pre-Print Journals</h4>
    <router-link to="/" v-for="(journal, index) in prePrints" :key="index">
      {{ journal.name }}
    </router-link>
    <br/>
    <h4>DeSci Journals</h4>
    <router-link to="/" v-for="(journal, index) in desSciJournals" :key="index">
      {{ journal.name }}
    </router-link>
  </div>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import prePrints from '@/contracts/preprint/contract-address.json';
import desSciJournals from '@/contracts/desci/contract-address.json';
</script>
  
<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 32px;
}

.subscription,
.recommendation {
  margin: 0 16px;
  width: 100%;
  max-width: 600px;
  padding: 16px;
  background-color: #f8f8f8;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.subscription {
  margin-bottom: 16px;
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
