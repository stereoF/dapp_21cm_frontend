import { ethers } from 'ethers';


// const switchNetwork = async () => {
//   if (window.ethereum) {
//     // console.log("window.ethereum.chainId", window.ethereum.chainId)
//     try {
//       // Try to switch to the Mumbai testnet
//       await window.ethereum.request({
//         method: 'wallet_switchEthereumChain',
//         params: [{ chainId: "0x539"}], // Check networks.js for hexadecimal network ids
//       });
//     } catch (error: any) {
//       // This error code means that the chain we want has not been added to MetaMask
//       // In this case we ask the user to add it to their MetaMask
//       if (error.code === 4902) {
//         try {
//           await window.ethereum.request({
//             method: 'wallet_addEthereumChain',
//             params: [
//               {   
//                 chainId: "0x539",
//                 chainName: 'Local Testnet',
//                 rpcUrls: ['http://172.27.192.1:7545'],
//                 nativeCurrency: {
//                     name: "Ethereum",
//                     symbol: "ETH",
//                     decimals: 18
//                 },
//               //   blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
//               },
//             ],
//           });
//         } catch (error) {
//           console.log(error);
//         }
//       }
//       console.log(error);
//     }
//   } else {
//     // If window.ethereum is not found then MetaMask is not installed
//     alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
//   } 
// }

const VITE_CHAIN_ID = import.meta.env.VITE_CHAIN_ID;
const VITE_CHAIN_NAME = import.meta.env.VITE_CHAIN_NAME;
const VITE_RPC_URL = import.meta.env.VITE_RPC_URL;
const VITE_NATIVE_CURRENCY_NAME = import.meta.env.VITE_NATIVE_CURRENCY_NAME;
const VITE_NATIVE_CURRENCY_SYMBOL = import.meta.env.VITE_NATIVE_CURRENCY_SYMBOL;
const VITE_BLOCK_EXPLORER_URL = import.meta.env.VITE_BLOCK_EXPLORER_URL;

const switchNetwork = async () => {
  if (window.ethereum) {
    try {
      // Try to switch to the Mumbai testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: VITE_CHAIN_ID }], // Check networks.js for hexadecimal network ids
      });
    } catch (error: any) {
      // This error code means that the chain we want has not been added to MetaMask
      // In this case we ask the user to add it to their MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {   
                chainId: VITE_CHAIN_ID,
                chainName: VITE_CHAIN_NAME,
                rpcUrls: [VITE_RPC_URL],
                nativeCurrency: {
                    name: VITE_NATIVE_CURRENCY_NAME,
                    symbol: VITE_NATIVE_CURRENCY_SYMBOL,
                    decimals: 18
                },
                blockExplorerUrls: [VITE_BLOCK_EXPLORER_URL]
              },
            ],
          });
        } catch (error) {
          console.log(error);
        }
      }
      console.log(error);
    }
  } else {
    // If window.ethereum is not found then MetaMask is not installed
    alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
  }
}

export async function useProvider() {
  // await switchNetwork();
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return { provider, signer, switchNetwork }
}