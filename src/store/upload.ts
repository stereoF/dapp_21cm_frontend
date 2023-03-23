import { defineStore } from 'pinia'

export const useUploadStore = defineStore({
  id: 'upload',
  state: () => ({
    cid: ''
  }),
  actions: {
    setCid(cid: string) {
      this.cid = cid
    }
  }
})
