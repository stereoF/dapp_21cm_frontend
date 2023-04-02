<template>
  <!-- <div class="form-group">
    <label>Reviewers:</label>
    <p>{{ reviewersList.join(', ') }}</p>
  </div> -->
  <form @submit.prevent="submitForm">
    <label for="reviewers">Reviewers:</label>
    <input type="text" id="reviewers" v-model="reviewersList">
    <button type="submit">Submit</button>
  </form>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";

export default defineComponent({
  data() {
    return {
      reviewersList: '',
    };
  },
  props: {
    address: String,
    paperId: String,
  },
  methods: {
    async submitForm() {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const deSciPrint = new ethers.Contract(
          this.address || '',
          DeSciPrint.abi,
          provider
      );

      const signer = provider.getSigner();
      const deSciPrintWithSigner = deSciPrint.connect(signer);

      await deSciPrintWithSigner.reviewerAssign(this.paperId, [this.reviewersList]);

    },
  },
});
</script>
