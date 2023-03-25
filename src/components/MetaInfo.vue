<template>
  <div>
    <h2>Meta Information</h2>
    <form>
      <div>
        <label for="cid">CID:</label>
        <input type="text" id="cid" v-model="cid" />
      </div>
      <div>
        <label for="title">Title:</label>
        <input type="text" id="title" v-model="title" />
      </div>
      <div>
        <label for="authors">Authors:</label>
        <div v-for="(author, index) in authors" :key="index">
          <input type="text" v-model="author.name" placeholder="Name" />
          <input type="email" v-model="author.email" placeholder="Email" />
          <input type="text" v-model="author.workplace" placeholder="Workplace" />
          <button type="button" @click="addAuthor(index)">+</button>
          <button type="button" @click="removeAuthor(index)">-</button>
        </div>
      </div>
      <div>
        <label for="fields">Fields:</label>
        <div v-for="(field, index) in fields" :key="index">
          <input type="text" v-model="field.field" placeholder="field" />
          <button type="button" @click="addField(index)">+</button>
          <button type="button" @click="removeField(index)">-</button>
        </div>
      </div>
      <div>
        <label for="abstract">Abstract:</label>
        <textarea id="abstract" v-model="abstract"></textarea>
      </div>
    </form>
    <button id="contractCall" @click="contractCall">submit</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { ethers } from "ethers";
import PrePrintArtifact from "../contracts/PrePrintTrack.json";
import contractAddress from "../contracts/contract-address.json";
import { useUploadStore } from '../store/upload';

// const store = useUploadStore();
// const { cid } = storeToRefs(store);

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
  setup() {
    const store = useUploadStore();
    const { cid } = storeToRefs(store);
    const title = ref('');
    const abstract = ref('');
    const state = reactive({
      // cid: '',
      // title: '',
      authors: [{ name: '', email: '', workplace: '' }],
      fields: [{ field: '' }],
      // abstract: '',
    });

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
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const prePrint = new ethers.Contract(
            contractAddress.PrePrintTrack,
            PrePrintArtifact.abi,
            provider
          );
          // console.log('The cid need to push: ', this.cid)
          const PrePrintWithSigner = prePrint.connect(signer);
          const description = {
            ...state,
            'title': title.value,
            'abstract': abstract.value
          };
          await PrePrintWithSigner.submit(cid.value, title.value, description);
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
      contractCall
    };
  },
});
</script>
