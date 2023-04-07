<template>
  <div class="container">
      <!-- Title -->
      <h1>Journal name: {{ journalName }}</h1>
      <h5>Paper Title: {{ paperInfo.keyInfo }}</h5>
      <h5>Paper CID: {{ paperId }}</h5>
      <div v-if="!isEditor" class="text-danger">You are not the editor of this journal</div>
      <div v-else>
        <form @submit.prevent="contractCall">
          <!-- <ManagerFields field-name="Editor" :fields="editors.map(editor => ({field: editor}))"/> -->
          <ManagerFields field-name="Reviewer" :fields="reviewers.map((editor: any) => ({field: editor}))" ref="reviewerFields"/>
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

export default defineComponent({
    name: "AssignReviewers",
    props: {
        address: {
            type: String,
            required: true
        },
        paperId: {
            type: String,
            required: true
        },
    },
    async setup(props) {
        const reviewerFields = ref();

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const deSciPrint = new ethers.Contract(props.address, DeSciPrint.abi, provider);
        const paperId = ref(props.paperId)
        const editors = reactive(await deSciPrint.editors());
        const paperInfo = reactive(await deSciPrint.deSciPrints(paperId.value));

        const journalName = ref(await deSciPrint.name());
        const reviewers = reactive(await deSciPrint.getReviewers(paperId.value));

        const yourAddress = ref(await provider.getSigner().getAddress());
        const isEditor = ref(editors.includes(yourAddress.value));

        let submitFailed = ref(false);
        let submitSucceed = ref(false);

        const contractCall = async () => {
          let reviewersFromField = reviewerFields.value.fields.map((field: any) => field.field);
          let intersection = reviewers.filter((v: any) => reviewersFromField.includes(v));
          let submitList = reviewersFromField.filter((v: any) => !intersection.includes(v));
          let removeList = reviewers.filter((v: any) => !intersection.includes(v));

          try {
            if (submitList.length > 0) {
              await deSciPrint.connect(provider.getSigner()).reviewerAssign(paperId.value, submitList);
            };

            if (removeList.length > 0) {
              await deSciPrint.connect(provider.getSigner()).removeReviewer(paperId.value, removeList);
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
            journalName,
            paperId,
            paperInfo,
            contractCall,
            submitFailed,
            submitSucceed,
            reviewers,
            reviewerFields,
            isEditor
        };
    },
    components: { ManagerFields }
})

</script>