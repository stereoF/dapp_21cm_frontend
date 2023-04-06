<template>
    <form @submit.prevent="contractCall">
      <div class="form-group d-flex align-items-center">
        <label for="cid" class="mr-2">CID:</label>
        <input type="text" id="cid" class="form-control mr-2" v-model="cid" placeholder="Select directory to get CID" />
        <el-select v-model="value" class="m-2" placeholder="Select" size="large">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
          />
        </el-select>
        <button id="contractCall" type="submit" class="btn btn-primary ml-2">Submit</button>
      </div>
      <div class="row mt-2">
        <!-- <div class="col-12 col-sm-8">
          <button id="contractCall" type="submit" class="btn btn-primary">Submit</button>
        </div> -->
        <div class="col-12 col-sm-4 mt-2 mt-sm-0">
          <div v-if="submitFailed" class="text-danger">Submit failed</div>
          <div v-if="submitSucceed" class="text-success">Submit succeed</div>
        </div>
      </div>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import { useUploadStore } from '@/store/upload';

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
    setup(props) {
        const store = useUploadStore();
        const { cid } = storeToRefs(store);
        const submitFailed = ref(false);
        const submitSucceed = ref(false);

        const value = ref(1)

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

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const deSciPrint = new ethers.Contract(
            props.address,
            DeSciPrint.abi,
            provider
        );

        const deSciPrintWithSigner = deSciPrint.connect(signer);

        const contractCall = async () => {
            try {
                await deSciPrintWithSigner.reviewPrint(props.paperCID, cid, value.value);
                submitSucceed.value = true;
                submitFailed.value = false;
            } catch (error) {
                console.error(error);
                submitFailed.value = true;
                submitSucceed.value = false;
            } finally {
                cid.value = '';
            }
        };

        return {
            cid,
            submitFailed,
            submitSucceed,
            contractCall,
            value,
            options
        };
    }

});

</script>

<style scoped>
.form-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}

#cid {
  flex-grow: 1;
  width: 500px; /* cid的长度再增加一些 */
}

.el-select {
  width: 150px;
}

#contractCall {
  margin-left: 10px;
}
</style>

