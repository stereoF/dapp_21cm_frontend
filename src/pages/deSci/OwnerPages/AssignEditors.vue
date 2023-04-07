<template>
  <div class="container">
      <!-- Title -->
      <h1>Manager the editors of journal: {{ title }}</h1>
      <div v-if="!isOwner" class="text-danger">You are not the owner of this journal</div>
      <div v-else>
        <form @submit.prevent="contractCall">
          <!-- <ManagerFields field-name="Editor" :fields="editors.map(editor => ({field: editor}))"/> -->
          <ManagerFields field-name="Editor" :fields="editors.map((editor: any) => ({field: editor}))" ref="editorFields"/>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import ManagerFields from '@/components/ManagerFields.vue';
import { useProvider } from '@/scripts/ethProvider'

export default defineComponent({
    name: "AssignEditors",
    props: {
        address: {
            type: String,
            required: true
        },
    },
    async setup(props) {
        const editorFields = ref();

        // const provider = new ethers.providers.Web3Provider(window.ethereum);
        const { provider } = await useProvider();
        const deSciPrint = new ethers.Contract(props.address, DeSciPrint.abi, provider);
        const title = ref(await deSciPrint.name());
        const editors = reactive(await deSciPrint.editors());

        const yourAddress = ref(await provider.getSigner().getAddress());
        const isOwner = ref(await deSciPrint.owner() === yourAddress.value);
        // const isOwner = computed(async () => (await deSciPrint.owner()) === yourAddress.value);

        let submitFailed = ref(false);
        let submitSucceed = ref(false);

        const contractCall = async () => {
          let editorsFromField = editorFields.value.fields.map((field: any) => field.field);
          let intersection = editors.filter((v: any) => editorsFromField.includes(v));
          let submitList = editorsFromField.filter((v: any) => !intersection.includes(v));
          let removeList = editors.filter((v: any) => !intersection.includes(v));

          try {
            if (submitList.length > 0) {
              await deSciPrint.connect(provider.getSigner()).pushEditors(submitList);
            };

            if (removeList.length > 0) {
              await deSciPrint.connect(provider.getSigner()).removeEditor(removeList);
            };
            
            submitSucceed.value = true;
            submitFailed.value = false;

          } catch (error) {
            console.error(error);
            submitFailed.value = true;
            submitSucceed.value = false;
          } 

        };

        return {
            title,
            contractCall,
            submitFailed,
            submitSucceed,
            editors,
            editorFields,
            isOwner
        };
    },
    components: { ManagerFields }
})

</script>
