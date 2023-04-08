import { ethers } from "ethers";
import DeSciPrint from "@/contracts/desci/DeSciPrint.json";
import { useProvider } from '@/scripts/ethProvider';

const { provider } = await useProvider();

export async function useDescription(address: string, fromBlock?: number, toBlock?: number) {
  const deSciPrint = new ethers.Contract(
    // props.address,
    address,
    DeSciPrint.abi,
    provider
  );

  toBlock = toBlock || (await provider.getBlockNumber());
  fromBlock = fromBlock || toBlock - 1296000;

  let events = await deSciPrint.queryFilter("Submit", fromBlock, toBlock);

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