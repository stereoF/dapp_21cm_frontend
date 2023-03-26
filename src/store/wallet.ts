import { defineStore } from 'pinia'

export const useWalletStore = defineStore({
    id: 'wallet',
    state: () => ({
        address: '',
        balance: 0
    }),
    actions: {
        setAddress(address: string) {
            this.address = address
        },
        setBalance(balance: number) {
            this.balance = balance
        }
    },
    getters: {
        getWalletConnected: (state) => {
            return state.address !== ''
        }
    }
})