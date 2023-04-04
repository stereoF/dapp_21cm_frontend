<template>
  <div class="container">
      <!-- Title -->
      <h1>{{ title }}</h1>
      <form @submit.prevent="contractCall">
        <ManagerFields field-name="Editor"/>
        <div class="row mt-2">
          <div class="col-12 col-sm-8">
            <button id="contractCall" type="submit" class="btn btn-primary">Submit</button>
          </div>
          <div class="col-12 col-sm-4 mt-2 mt-sm-0">
            <div v-if="submitFailed" class="text-danger">Submit failed</div>
            <div v-if="submitSucceed" class="text-success">Submit succeed</div>
          </div>
        </div>
      </form>        
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import ManagerFields from '../ManagerFields.vue';

export default defineComponent({
    name: "AssignEditors",
    props: {
        address: {
            type: String,
            required: true
        },
    },
    async setup(props) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const deSciPrint = new ethers.Contract(props.address as string, DeSciPrint.abi, provider);
        const title = ref(await deSciPrint.name());
        const editors = await deSciPrint.editors();
        console.log(editors);
        let submitFailed = ref(false);
        let submitSucceed = ref(false);
        const contractCall = async () => {
        };
        return {
            title,
            contractCall,
            submitFailed,
            submitSucceed
        };
    },
    components: { ManagerFields }
})

</script>
