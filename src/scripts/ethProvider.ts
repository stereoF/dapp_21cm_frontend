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


const switchNetwork = async () => {
  if (window.ethereum) {
    try {
      // Try to switch to the Mumbai testnet
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x13881' }], // Check networks.js for hexadecimal network ids
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
                chainId: '0x13881',
                chainName: 'Polygon Mumbai Testnet',
                rpcUrls: ['https://rpc-mumbai.maticvigil.com/'],
                nativeCurrency: {
                    name: "Mumbai Matic",
                    symbol: "MATIC",
                    decimals: 18
                },
                blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
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