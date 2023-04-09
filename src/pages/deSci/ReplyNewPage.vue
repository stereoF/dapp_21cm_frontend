<template>
    <div class="common-layout">
      <el-container>
        <el-header>
            <h2>Journal: {{ journalName }}</h2>
        </el-header>
        <el-main>
          <div v-if="!isAuthor" class="text-danger">You are not the author of this paper</div>
          <div v-else-if="process.processStatus != 5" class="text-danger">The status of this paper must be NeedRevise</div>
          <div v-else class="container">
            <div>
                <h3>Previous version of the paper:</h3>
                <PaperInfo :cid="props.prevCID" :address="props.address" />
            </div>
            <div class="divider"></div>
            <div class="file-upload-container">
              <FileUpload/>
              <!-- <div v-if="cidValue">CID Value: {{cidValue}}</div> -->
            </div>
            <div class="container mt-4">
                <form @submit.prevent="contractCall">
                    <Suspense>
                        <MetaForm :address="props.address" ref="metaForm"/>
                        <template #fallback>
                            Loading...
                        </template>
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
    import { ref, reactive } from 'vue';
    import FileUpload from '@/components/FileUpload.vue'
    import MetaForm from "./MetaForm.vue";
    import PaperInfo from "./PaperInfo.vue";
    import { useProvider } from '@/scripts/ethProvider'
    import DeSciPrint from "@/contracts/desci/DeSciPrint.json";

    const metaForm = ref();
    const props = defineProps(
        {
            address: {
                type: String,
                required: true,
            },
            prevCID: {
                type: String,
                required: true,
            },
        }
    );

    const { provider, signer } = await useProvider();
    const deSciPrint = new ethers.Contract(
        props.address,
        DeSciPrint.abi,
        provider
    );

    let journalName = ref(await deSciPrint.name());
    let submitFailed = ref(false);
    let submitSucceed = ref(false);

    let printInfo = reactive(await deSciPrint.deSciPrints(props.prevCID));

    // const yourAddress = ref(await provider.getSigner().getAddress());
    const yourAddress = ref(signer.getAddress());
    const isAuthor = ref(yourAddress.value === printInfo.submitAddress);

    let process = reactive(await deSciPrint.deSciProcess(props.prevCID));

    const contractCall = async () => {
        // const deSciPrintWithSigner = deSciPrint.connect(signer);
        const description = {
            'authors': metaForm.value.authors,
            'fields': metaForm.value.fields,
            'title': metaForm.value.title,
            'abstract': metaForm.value.abstract
        };

        // const signer = provider.getSigner();
        const deSciPrintWithSigner = deSciPrint.connect(signer);
        
        let donateEther = ethers.utils.parseEther(metaForm.value.donate);
        let gasEther = ethers.utils.parseEther(metaForm.value.gas);
        let amount = donateEther.add(gasEther);

        try {
            await deSciPrintWithSigner.replyNew(props.prevCID, metaForm.value.cid, metaForm.value.title, description, donateEther, { value: amount });
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

.divider {
  margin-top: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #ccc;
  width: 100%;
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

h2 {
  text-align: center; /* Add this line to center align h2 */
}
  
</style>