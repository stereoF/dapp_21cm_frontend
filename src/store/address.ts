import { defineStore } from 'pinia'

export const useAddress = defineStore({
  id: 'currentAddress',
  state: () => ({
    address: ''
  }),
  actions: {
    setAddress(address: string) {
      this.address = address
    }
  },
  persist: true,
})