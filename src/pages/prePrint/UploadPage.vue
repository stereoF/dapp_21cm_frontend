<template>
  <div style="margin-top: 20px;">
      <a-space direction="vertical">
          <a-row justify="center">
              <h3>Submit to Preprint Repository</h3>
          </a-row>
          <a-row justify="center">
              <div>
                  <FileUpload />
              </div>
          </a-row>
          <div>
              <MetaInfo contractType="preprint" @submit="contractCall" />
          </div>
      </a-space>
  </div>
</template>

<script lang="ts" setup>
import { ethers } from "ethers";
import { useRouter } from 'vue-router'
import { Notification } from '@arco-design/web-vue';
import FileUpload from '@/components/FileUpload.vue';
import MetaInfo from '@/components/MetaInfo.vue';
import { useProvider } from '@/scripts/ethProvider';
import contractABI from "@/contracts/preprint/PrePrintTrack.json";

const props = defineProps(
  {
      address: {
          type: String,
          required: true,
      },
  }
);

const { provider, signer } = await useProvider();
const router = useRouter()
const contract = new ethers.Contract(
  props.address,
  contractABI.abi,
  provider
);

const contractCall = async (data: any) => {
  const description = {
      'authors': data.authors,
      'fields': data.fields,
      'title': data.title,
      'abstract': data.abstract
  };

  const contractWithSigner = contract.connect(signer);

  try {
      await contractWithSigner.submit(data.cid, data.title, JSON.stringify(description));
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