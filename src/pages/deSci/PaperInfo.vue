<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-header">
            <h2>{{ paper.title }}</h2>
          </div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label>cid:</label>
                  <p>{{ cid }}</p>
                </div>
                <div class="form-group">
                  <label>Submitted by:</label>
                  <p>{{ paper.submitter }}</p>
                </div>
                <div class="form-group">
                  <label>Submitted at:</label>
                  <p>{{ paper.submitTime }}</p>
                </div>
              </div>
              <div class="col-md-6">
                <div class="form-group">
                  <label>Reviewers:</label>
                  <p>{{ paper.reviewers.join(', ') }}</p>
                </div>
                <div class="form-group">
                  <label>Editors:</label>
                  <p>{{ paper.editors.join(', ') }}</p>
                </div>
                <div class="form-group">
                  <label>Status:</label>
                  <p>{{ paper.status }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";

interface Paper {
  cid: string;
  title: string;
  submitter: string;
  submitTime: string;
  reviewers: string[];
  editors: string[];
  status: string;
}

export default defineComponent({
  name: 'PaperInfo',
  props: {
    cid: String,
  },
  async setup(props) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const deSciPrint = new ethers.Contract(
    "0xcfCA439EB07c003e152137C189199170285d87fD",
      DeSciPrint.abi,
      provider
    );

    let printInfo = await deSciPrint.deSciPrints(props.cid);
    let paper:Paper = {
      cid: props.cid || '',
      title: printInfo.keyInfo,
      submitter: printInfo.submitAddress,
      submitTime: printInfo.submitTime ? new Date(printInfo.submitTime * 1000).toLocaleString() : '', 
      reviewers: [],
      editors: [],
      status: '',
    };

    return {
      paper
    }
  },
});
</script>

<style scoped>
.container {
  margin-top: 50px;
}

.card-header {
  background-color: #007bff;
  color: #fff;
}

.card-body {
  background-color: #f8f9fa;
}

.form-group {
  margin-bottom: 0;
}

label {
  font-weight: bold;
}
</style>
