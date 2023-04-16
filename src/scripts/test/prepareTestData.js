const ethers = require('ethers');
const deSciABI = require("../../contracts/desci/DeSciPrint.json");
const deSciAddressFile = require("../../contracts/desci/contract-address.json");


console.log('prepare data for testing');

let paperCID = 'paperCID_6';

const deSciAddress = deSciAddressFile[0].address;

const privateKeyAuthor = "ed8b76f4de88432ed45aa3ec420af4d48ea1f46a0175f345662f915b198b94d5";
const privateKeyEditor = "da8a9b0cedfebb0ea13a984034815d637236abb03251457fc6504ff4df7aac22";
const privateKeyReviewer1 = "21a3df5dbc04880ee5134632f5a2947036b0263ac11af3e7f8822fd6a882641f";
const privateKeyReviewer2 = "c2ca3a61e74d553bbec48ddd97954c3be22f65296b3352890c8e35cce4cfcd95";

const provider = new ethers.providers.JsonRpcProvider('http://172.27.192.1:7545');
const authorSigner = new ethers.Wallet(privateKeyAuthor, provider);
console.log('author address: ', authorSigner.address);
const editorSigner = new ethers.Wallet(privateKeyEditor, provider);
console.log('editor address: ', editorSigner.address);
const reviewer1Signer = new ethers.Wallet(privateKeyReviewer1, provider);
console.log('reviewer1 address: ', reviewer1Signer.address);
const reviewer2Signer = new ethers.Wallet(privateKeyReviewer2, provider);
console.log('reviewer2 address: ', reviewer2Signer.address);

const deSciContract = new ethers.Contract(
    deSciAddress,
    deSciABI.abi,
    provider
);

async function submit(paperCID) {

    const minGasCost = await deSciContract.gasFee(0);
    const donateAmount = ethers.utils.parseEther('0.0005', 'ether');

    const description = {
        authors: [
            {
                name: "test",
                email: "test@test.com",
                affiliation: "test"
            }
        ],
        fields: [
            {
                field: "test"
            }
        ],
        title: "test",
        abstract: "test"
    }

    const paper = {
        paperCID: paperCID,
        keyInfo: 'Test Paper Title',
        description: JSON.stringify(description),
        amount: donateAmount
    };

    await deSciContract.connect(authorSigner).submitForReview(paper.paperCID, paper.keyInfo, paper.description, paper.amount, { value: paper.amount.add(minGasCost) });
    console.log('submit paper: ', paperCID);
};


async function assignReviewers(paperCID) {
    await submit(paperCID);
    await deSciContract.connect(editorSigner).reviewerAssign(paperCID, [reviewer1Signer.address, reviewer2Signer.address]);
    console.log('assign reviewers: ', [reviewer1Signer.address, reviewer2Signer.address]);
}

async function reviewPrint(paperCID, reviewerSigner, comment, choice) {
    await assignReviewers(paperCID);
    await deSciContract.connect(reviewerSigner).reviewPrint(paperCID, comment, choice);
    console.log('review paper: ', paperCID);
}

reviewPrint(paperCID, reviewer1Signer, 'reviewer1', 1);





