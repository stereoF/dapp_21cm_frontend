<template>
  <a-form :model="form" @submit="contractCall">
      <a-form-item>
          <a-space direction="horizontal" :style="{ width: '100%' }">
              <a-input :style="{ width: '450px' }" v-model="cid" placeholder="Select directory to get CID" />
              <a-select v-model="form.value" class="m-2" placeholder="Select" size="large">
                  <a-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
              </a-select>
              <a-button html-type="submit">Submit</a-button>
          </a-space>
      </a-form-item>
  </a-form>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue';
import { ethers } from "ethers";
import { Notification } from '@arco-design/web-vue';
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import { storeToRefs } from 'pinia';
import { useUploadStore } from '@/store/upload';
import { useProvider } from '@/scripts/ethProvider'

export default defineComponent({
  name: 'SubmitCommentCID',
  props: {
      address: {
          type: String,
          required: true,
      },
      paperCID: {
          type: String,
          required: true,
      },
  },
  async setup(props) {
      const store = useUploadStore();
      const form = reactive({
          value: 1,
      })
      const { cid } = storeToRefs(store);
      const options = [
          {
              value: 1,
              label: 'revise',
          },
          {
              value: 2,
              label: 'reject',
          },
          {
              value: 3,
              label: 'pass',
          },
      ]

      const { provider, signer } = await useProvider();

      const deSciPrint = new ethers.Contract(
          props.address,
          DeSciPrint.abi,
          provider
      );

      const deSciPrintWithSigner = deSciPrint.connect(signer);

      const contractCall = async () => {
          try {
              await deSciPrintWithSigner.reviewPrint(props.paperCID, cid, form.value);
              Notification.success({
                  title: 'Succeed',
                  content: 'You successfully submit your comment',
              })
          } catch (error) {
              console.error(error);
              Notification.success({
                  title: 'Failed!',
                  content: 'You failed to submit your comment',
              })
          } finally {
              cid.value = '';
          }
      };

      return {
          contractCall,
          options,
          form,
          cid
      };
  },
});
</script>