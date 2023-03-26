<template>
    <div class="container">
      <div class="content">
        <div v-if="getWalletConnected" class="subscription">
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
  import { storeToRefs } from 'pinia';
  import { useWalletStore } from '../store/wallet';
  
  export default defineComponent({
    name: 'HomeView',
    setup() {
      const store = useWalletStore();
      const { getWalletConnected } = storeToRefs(store);
      const subscriptions = ref(['Subscription 1', 'Subscription 2']);
      const recommendations = ref([
        'Recommendation 1',
        'Recommendation 2',
        'Recommendation 3',
      ]);

      return {
        getWalletConnected,
        subscriptions,
        recommendations,
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
