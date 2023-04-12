<template>
  <div style="margin-top: 20px;">
      <a-space direction="vertical">
          <a-row justify="center">
              <h3>Submit to Journal: {{ journalName }}</h3>
          </a-row>
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
</template>

<script lang="ts" setup>
import { ethers } from "ethers";
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import { Notification } from '@arco-design/web-vue';
import FileUpload from '@/components/FileUpload.vue';
import MetaInfo from '@/components/MetaInfo.vue';
import { useProvider } from '@/scripts/ethProvider';
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";

const props = defineProps(
  {
      address: {
          type: String,
          required: true,
      },
  }
);

const router = useRouter()
const { provider, signer } = await useProvider();
const deSciPrint = new ethers.Contract(
  props.address,
  DeSciPrint.abi,
  provider
);

let journalName = ref(await deSciPrint.name());

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
      router.push({ name: 'success-submit', 
          query: { 
              title: 'You have successfully submitted your paper',
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