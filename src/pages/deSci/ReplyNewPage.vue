<template>
  <div class="common-layout">
    <a-layout>
      <a-layout-header>
        <h2>Journal: {{ journalName }}</h2>
      </a-layout-header>
      <a-layout-content>
        <div v-if="!isAuthor" class="text-danger">You are not the author of this paper</div>
        <div v-else-if="process.processStatus != 5" class="text-danger">The status of this paper must be NeedRevise</div>
        <div v-else class="container">
          <div>
            <h3>Previous version of the paper:</h3>
            <PaperInfo :cid="props.prevCID" :address="props.address" />
          </div>
          <a-divider />
          <a-space direction="vertical">
            <a-row justify="center">
              <div>
                <FileUpload />
              </div>
            </a-row>
            <div>
              <MetaInfo contractType="desci" :donate="Number(donate)" :gas="Number(gas)" @submit="contractCall" />
            </div>
          </a-space>
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>
  
<script lang="ts" setup>
import { ethers } from "ethers";
import { ref, reactive } from 'vue';
import { Notification } from '@arco-design/web-vue';
import { useRouter } from 'vue-router'
import FileUpload from '@/components/FileUpload.vue'
import MetaInfo from '@/components/MetaInfo.vue';
import PaperInfo from "./PaperInfo.vue";
import { useProvider } from '@/scripts/ethProvider'
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";

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
const router = useRouter()
const deSciPrint = new ethers.Contract(
  props.address,
  DeSciPrint.abi,
  provider
);

let journalName = ref(await deSciPrint.name());
let printInfo = reactive(await deSciPrint.deSciPrints(props.prevCID));

const yourAddress = ref(await signer.getAddress());
const isAuthor = ref(yourAddress.value === printInfo.submitAddress);

let process = reactive(await deSciPrint.deSciProcess(props.prevCID));

let minGas = await deSciPrint.gasFee(0);
let minDonate = await deSciPrint.gasFee(4);

let minGasEth = ethers.utils.formatEther(minGas);
let minDonateEth = ethers.utils.formatEther(minDonate);

const donate = ref(minDonateEth);
const gas = ref(minGasEth);

const contractCall = async (data: any) => {
  const description = {
    'authors': data.authors,
    'fields': data.fields,
    'title': data.title,
    'abstract': data.abstract
  };

  const deSciPrintWithSigner = deSciPrint.connect(signer);

  let donateEther = ethers.utils.parseEther(data.donate.toString());
  let gasEther = ethers.utils.parseEther(data.gas.toString());
  let amount = donateEther.add(gasEther);

  try {
    await deSciPrintWithSigner.submitForReview(data.cid, data.title, JSON.stringify(description), donateEther, { value: amount });
    router.push({
      name: 'success-submit',
      query: {
        title: 'You have successfully submitted the edited paper',
        subtitle: ' It may take a few minutes for the blockchain to package the transaction containing your paper, \
              so please wait a moment before confirming whether your paper appears on the blockchain.'
      }
    });
  } catch (error: any) {
    console.error(error);
    Notification.error({
      title: 'Submit Failed',
      content: error.message,
    });
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

h2 {
  text-align: center;
  /* Add this line to center align h2 */
}
</style>