const ethers = require('ethers');
const deSciABI = require("../../contracts/desci/DeSciPrint.json");
const deSciAddressFile = require("../../contracts/desci/contract-address.json");


const deSciAddress = deSciAddressFile[0].address;
console.log('get the data from contract: ', deSciAddress);

const provider = new ethers.providers.JsonRpcProvider('http://172.27.192.1:7545');
const deSciContract = new ethers.Contract(
    deSciAddress,
    deSciABI.abi,
    provider
);


async function getPaperList(status) {
    let deSciPrintCnt = await deSciContract.deSciPrintCnt();

    let paperCIDs = await deSciContract.printsPool(status, 0, deSciPrintCnt - 1);
    console.log('paperCIDs: ', paperCIDs);

}

async function getAuthor(paperCID) {
    let author = (await deSciContract.deSciPrints(paperCID)).submitAddress;
    console.log('author: ', author);

}

async function getProcessInfo(paperCID) {
    let processInfo = await deSciContract.deSciProcess(paperCID);
    console.log('processInfo: ', processInfo);
}

getPaperList(6);
// getAuthor('paperCID_1')
// getProcessInfo('reply_new_1')

