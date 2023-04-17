import { defineStore } from 'pinia'

export const useWalletStore = defineStore({
    id: 'wallet',
    state: () => ({
        address: '',
        balance: 0,
        // chainId: '0x',
    }),
    actions: {
        setAddress(address: string) {
            this.address = address
        },
        setBalance(balance: number) {
            this.balance = balance
        },
        // setChainId(chainId: string) {
        //     this.chainId = chainId
        // }
    },
    getters: {
        getWalletConnected: (state) => {
            return state.address !== ''
        },
        // getConnectionStatus: (state) => {
        //     return state.chainId === '0x13881' ? true : false
        // } 
    }
})