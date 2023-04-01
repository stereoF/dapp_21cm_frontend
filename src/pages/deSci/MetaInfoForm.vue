<template>
  <div class="container mt-4">
    <h2>Meta Information</h2>
    <form @submit.prevent="contractCall">
      <div class="form-group">
        <label for="cid">CID:</label>
        <input type="text" id="cid" class="form-control" v-model="cid" placeholder="Select directory to get CID" />
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" id="title" class="form-control" v-model="title" />
      </div>
      <div class="form-group">
        <label for="authors">Authors:</label>
        <div v-for="(author, index) in authors" :key="index" class="row align-items-center">
          <div class="col-3 pr-1">
            <input type="text" v-model="author.name" placeholder="Name" class="form-control" />
          </div>
          <div class="col-4 px-1">
            <input type="email" v-model="author.email" placeholder="Email" class="form-control" />
          </div>
          <div class="col-4 pl-1">
            <input type="text" v-model="author.workplace" placeholder="Workplace" class="form-control" />
          </div>
          <div class="col-1 author-buttons">
            <div>
              <button type="button" @click="addAuthor(index)" class="btn btn-success btn-sm">+</button>
            </div>
            <div>
              <button type="button" @click="removeAuthor(index)" class="btn btn-danger btn-sm">-</button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="fields">Fields:</label>
        <div v-for="(field, index) in fields" :key="index" class="row align-items-center">
          <div class="col-10 pr-1">
            <input type="text" v-model="field.field" placeholder="Field" class="form-control" />
          </div>
          <div class="col-1 author-buttons">
            <div>
              <button type="button" @click="addField(index)" class="btn btn-success btn-sm">+</button>
            </div>
            <div>
              <button type="button" @click="removeField(index)" class="btn btn-danger btn-sm">-</button>
            </div>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="abstract">Abstract:</label>
        <textarea id="abstract" v-model="abstract" class="form-control"></textarea>
      </div>
      <div class="form-group">
        <label for="donate">Donate to editors and reviewers</label>
        <input type="text" id="donate" v-model="donate" class="form-control">
      </div>
      <div class="form-group">
        <label for="gas">Pay gas fee to editors and reviewers</label>
        <input type="text" id="gas" v-model="gas" class="form-control">
      </div>
      <div class="row mt-2">
        <div class="col-12 col-sm-8">
          <button id="contractCall" type="submit" class="btn btn-primary">Submit</button>
        </div>
        <div class="col-12 col-sm-4 mt-2 mt-sm-0">
          <div v-if="submitFailed" class="text-danger">Submit failed</div>
          <div v-if="submitSucceed" class="text-success">The paper's information has been written into the smart contract</div>
        </div>
      </div>
    </form>
  </div>
</template>


<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import { useUploadStore } from '@/store/upload';

interface Author {
  name: string;
  email: string;
  workplace: string;
}

interface Field {
  field: string;
}

export default defineComponent({
  name: 'MetaInfo',
  props: {
    address: String,
  },
  async setup(props) {
    const store = useUploadStore();
    const { cid } = storeToRefs(store);
    const title = ref('');
    const abstract = ref('');
    const state = reactive({
      authors: [{ name: '', email: '', workplace: '' }],
      fields: [{ field: '' }],
    });

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const deSciPrint = new ethers.Contract(
      props.address || '',
      DeSciPrint.abi,
      provider
    );


    let minGas = await deSciPrint.gasFee(0);
    let minDonate = await deSciPrint.gasFee(4);

    let minGasEth = ethers.utils.formatEther(minGas);
    let minDonateEth = ethers.utils.formatEther(minDonate);

    const donate = ref(minDonateEth);
    const gas = ref(minGasEth);

    let submitFailed = ref(false);
    let submitSucceed = ref(false);

    const addAuthor = (index: number) => {
      state.authors.splice(index + 1, 0, { name: '', email: '', workplace: '' });
    };

    const removeAuthor = (index: number) => {
      if (state.authors.length > 1) {
        state.authors.splice(index, 1);
      }
    };

    const addField = (index: number) => {
      state.fields.splice(index + 1, 0, { field: '' });
    };

    const removeField = (index: number) => {
      if (state.fields.length > 1) {
        state.fields.splice(index, 1);
      }
    };

    const contractCall = async () => {

      // const deSciPrintWithSigner = deSciPrint.connect(signer);
      const description = {
        ...state,
        'title': title.value,
        'abstract': abstract.value
      };
      
      const signer = provider.getSigner();
      const deSciPrintWithSigner = deSciPrint.connect(signer);
        
      let donateEther = ethers.utils.parseEther(donate.value);
      let gasEther = ethers.utils.parseEther(gas.value);
      let amount = donateEther.add(gasEther);

      try {
          await deSciPrintWithSigner.submitForReview(cid.value, title.value, description, donateEther, { value: amount });
          submitSucceed.value = true;
          submitFailed.value = false;
      } catch (error) {
        console.error(error);
        submitFailed.value = true;
        submitSucceed.value = false;
      } finally {
        state.authors.forEach(author => {
          author.name = '';
          author.email = '';
          author.workplace = '';
        });
        state.fields.forEach(field => {
          field.field = '';
        });
        title.value = '';
        abstract.value = '';
        cid.value = '';
      }
    };

    return {
      cid,
      title,
      abstract,
      ...state,
      addAuthor,
      removeAuthor,
      addField,
      removeField,
      contractCall,
      submitFailed,
      submitSucceed,
      donate,
      gas
    };
  },
});
</script>

<style scoped>
/* 样式代码 */
h2 {
  font-size: 28px;
  margin-bottom: 20px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"],
textarea {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 8px;
  margin-bottom: 16px;
}

input[type="text"]:focus,
input[type="email"]:focus,
textarea:focus {
  outline: none;
  border-color: #5bc0de;
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

.author-buttons {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.author-buttons button {
  margin-left: 8px;
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
