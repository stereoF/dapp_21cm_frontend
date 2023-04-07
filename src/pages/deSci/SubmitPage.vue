<template>
    <div class="common-layout">
      <el-container>
        <el-main>
          <div class="container">
            <div class="file-upload-container">
              <FileUpload/>
              <!-- <div v-if="cidValue">CID Value: {{cidValue}}</div> -->
            </div>
            <div class="container mt-4">
                <h2>Meta Information need submitting to Journal: {{ journalName }}</h2>
                <form @submit.prevent="contractCall">
                    <Suspense>
                        <MetaForm :address="props.address" ref="metaForm"/>
                    </Suspense>
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
        </el-main>
      </el-container>
    </div>
  </template>
  
<script lang="ts" setup>
    import { ethers } from "ethers";
    import { ref } from 'vue';
    import FileUpload from '@/components/FileUpload.vue'
    import MetaForm from "./MetaForm.vue";
    import { useProvider } from '@/scripts/ethProvider'
    import DeSciPrint from "@/contracts/desci/DeSciPrint.json";

    const metaForm = ref();
    const props = defineProps(
        {
            address: {
                type: String,
                required: true,
            },
        }
    );

    const { provider } = await useProvider();
    const deSciPrint = new ethers.Contract(
        props.address,
        DeSciPrint.abi,
        provider
    );

    let journalName = ref(await deSciPrint.name());
    let submitFailed = ref(false);
    let submitSucceed = ref(false);

    const contractCall = async () => {
        // const deSciPrintWithSigner = deSciPrint.connect(signer);
        const description = {
            'authors': metaForm.value.authors,
            'fields': metaForm.value.fields,
            'title': metaForm.value.title,
            'abstract': metaForm.value.abstract
        };

        const signer = provider.getSigner();
        const deSciPrintWithSigner = deSciPrint.connect(signer);
        
        let donateEther = ethers.utils.parseEther(metaForm.value.donate);
        let gasEther = ethers.utils.parseEther(metaForm.value.gas);
        let amount = donateEther.add(gasEther);

        try {
            await deSciPrintWithSigner.submitForReview(metaForm.value.cid, metaForm.value.title, description, donateEther, { value: amount });
            submitSucceed.value = true;
            submitFailed.value = false;
        } catch (error) {
            console.error(error);
            submitFailed.value = true;
            submitSucceed.value = false;
        } finally {
            metaForm.value.authors.forEach((author: { name: string; email: string; workplace: string; }) => {
                author.name = '';
                author.email = '';
                author.workplace = '';
            });
            metaForm.value.fields.forEach((field: { field: string; }) => {
                field.field = '';
            });
            metaForm.value.title = '';
            metaForm.value.abstract = '';
            metaForm.value.cid = '';
        }
    };

</script>
  
<style scoped>
.container {
display: flex;
flex-direction: column;
align-items: center;
}

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

button[type="button"] {
  border: none;
  background-color: #5bc0de;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-left: 8px;
}

button[type="submit"] {
  border: none;
  background-color: #5cb85c;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  margin-top: 16px;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #449d44;
}

div[v-if="submitFailed"] {
  color: red;
  margin-top: 16px;
}

.row .col-12.col-sm-8 {
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.row .col-12.col-sm-4 {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.text-danger, .text-success {
  margin-left: 10px;
}
  
</style>