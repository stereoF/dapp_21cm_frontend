<template>
  <!-- <div class="common-layout">
    <a-layout>
      <a-layout-header>
        <h2>Journal: {{ journalName }}</h2>
      </a-layout-header>
      <a-layout-content>
        <div v-if="!isAuthor">
          <a-alert type="warning">You are not the author of this paper.</a-alert>
        </div>
        <div v-else class="container">
          <div>
            <Suspense>
              <PaperInfo :address="$props.address" :paperCID="$props.paperCID" />
              <template #fallback>
                <a-space size="large">
                  <a-spin :size="32" />
                </a-space>
              </template>
            </Suspense>
          </div>
          <a-divider />
        </div>
      </a-layout-content>
    </a-layout>
  </div> -->
</template>
  
<script lang="ts" setup>
// import { ethers } from "ethers";
// import { ref, reactive } from 'vue';
// import { Notification } from '@arco-design/web-vue';
// import { useRouter } from 'vue-router'
// import FileUpload from '@/components/FileUpload.vue'
// import MetaInfo from '@/components/MetaInfo.vue';
// import PaperInfo from "../PaperInfo.vue";
// import { useProvider } from '@/scripts/ethProvider'
// import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
// import { IconExclamationCircleFill } from '@arco-design/web-vue/es/icon';

// const props = defineProps(
//   {
//     address: {
//       type: String,
//       required: true,
//     },
//     paperCID: {
//       type: String,
//       required: true,
//     },
//   }
// );

// const { provider, signer } = await useProvider();
// const router = useRouter()
// const deSciPrint = new ethers.Contract(
//   props.address,
//   DeSciPrint.abi,
//   provider
// );

// let journalName = ref(await deSciPrint.name());
// let printInfo = reactive(await deSciPrint.deSciPrints(props.paperCID));

// const yourAddress = ref(await signer.getAddress());
// const isAuthor = ref(yourAddress.value === printInfo.submitAddress);

// const contractCall = async (data: any) => {

//   try {
//     router.push({
//       name: 'success-submit',
//       query: {
//         title: 'You have successfully submitted the edited paper',
//         subtitle: ' It may take a few minutes for the blockchain to package the transaction containing your paper, \
//               so please wait a moment before confirming whether your paper appears on the blockchain.'
//       }
//     });
//   } catch (error: any) {
//     console.error(error);
//     Notification.error({
//       title: 'Submit Failed',
//       content: error.message,
//     });
//   }
// };

</script>
  
<style scoped>

h2 {
  font-size: 28px;
  margin-bottom: 20px;
}
</style>
