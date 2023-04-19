import { defineStore } from 'pinia'

export const useAddress = defineStore({
  id: 'currentAddress',
  state: () => ({
    address: '',
    pathType: '',
  }),
  actions: {
    setAddress(address: string) {
      this.address = address
    },
    setPathType(pathType: string) {
      this.pathType = pathType
    }
  },
  getters: {
    getJournalHomeLink: (state) => {
      let journalHomeLink: any = {name: 'home'};

      if (state.pathType==='preprint') {
        journalHomeLink = state.address=='' ?  {name: 'home'} : {name: 'preprint-journal-published', params: {address: state.address}};
      } else if (state.pathType==='desci') {
        journalHomeLink = state.address=='' ?  {name: 'home'} : {name: 'desci-journal-published', params: {address: state.address}};
      } else {
        journalHomeLink = {name: 'home'};
      }

      return journalHomeLink;
    }
  },
  persist: true,
})