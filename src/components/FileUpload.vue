<template>
  <a-space direction="vertical" :style="{ width: '100%' }">
    <a-upload
      action=""
      directory
      v-model:file-list="fileList"
      :auto-upload="false"
      ref="uploadRef"
      @change="onChange"
    >
      <template #upload-button>
        <a-space>
          <a-button> select directory</a-button>
          <a-button type="primary" :disabled="fileListEmpty" @click="submit"> start upload</a-button>
        </a-space>
      </template>
    </a-upload>
  </a-space>
</template>

<script lang="ts">
import { ref, computed } from 'vue';
// import axios from 'axios';
import { useUploadStore } from '@/store/upload' 
import type { FileItem } from '@arco-design/web-vue';
import { useAxios } from '@/scripts/httpclient';

export default {
  setup() {
      const uploadRef = ref();
      const files = ref<FileItem[]>([]);
      const fileList = ref([]);
      const store = useUploadStore();
      const { axiosInstance} = useAxios();

      const fileListEmpty = computed(() => {
          return fileList.value.length > 0 ? false : true
      })

      const submit = async (e:any) => {
          e.stopPropagation();
          let formData:any = new FormData();  
          files.value.forEach(file => {formData.append('files', file.file)}) 

          let res = await axiosInstance.post("/files/uploadfiles/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
          // let res = await axios.post("http://127.0.0.1:8000/files/uploadfiles/", formData, {headers: {'Content-Type': 'multipart/form-data'}})
          let cid = res.data.cid
          store.setCid(cid)
          fileList.value = []
      };

      const onChange = (fileList: any) => {
          files.value = fileList;
      };

      return {
          files,
          submit,
          onChange,
          fileList,
          fileListEmpty
      };
  },
};
</script>