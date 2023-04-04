<template>
  <div class="container">
      <!-- Title -->
      <h1>Manager the editors of journal: {{ title }}</h1>
      <form @submit.prevent="contractCall">
        <!-- <ManagerFields field-name="Editor" :fields="editors.map(editor => ({field: editor}))"/> -->
        <ManagerFields field-name="Editor" :fields="editors.map((editor: any) => ({field: editor}))"/>
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
import { defineComponent, ref, reactive } from 'vue';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import ManagerFields from '@/components/ManagerFields.vue';

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
        const editors = reactive(await deSciPrint.editors());
        let submitFailed = ref(false);
        let submitSucceed = ref(false);
        const contractCall = async () => {
        };
        return {
            title,
            contractCall,
            submitFailed,
            submitSucceed,
            editors
        };
    },
    components: { ManagerFields }
})

</script>
