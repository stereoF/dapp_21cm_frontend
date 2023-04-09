import { ethers } from "ethers";
// import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import PrePrintTrack from "@/contracts/preprint/PrePrintTrack.json";
import { useProvider } from '@/scripts/ethProvider';

const { provider } = await useProvider();

export async function useDescription(address: string, fromBlock?: number, toBlock?: number) {
  const prePrintTrack = new ethers.Contract(
    // props.address,
    address,
    PrePrintTrack.abi,
    provider
  );

  toBlock = toBlock || (await provider.getBlockNumber());
  // fromBlock = fromBlock || toBlock - 1296000;
  fromBlock = fromBlock || toBlock - 1000;

  let events = await prePrintTrack.queryFilter("Submit", fromBlock, toBlock);
  console.log(events);

  let description: { [key: string]: any } = {};
  for (let event of events) {
    try {
      description[event.args?.fileCID] = JSON.parse(event.args?.description);
    } catch (error) {
      console.log(error);
    }
  }
  
  return { description };
}