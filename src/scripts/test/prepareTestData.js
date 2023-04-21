const ethers = require('ethers');
const deSciABI = require("../../contracts/desci/DeSciPrint.json");
const deSciAddressFile = require("../../contracts/desci/contract-address.json");

const prePrintABI = require("../../contracts/preprint/PrePrintTrack.json");
const prePrintAddressFile = require("../../contracts/preprint/contract-address.json");


console.log('prepare data for testing');

let paperCID = 'paperCID_6';

const deSciAddress = deSciAddressFile[0].address;
console.log('deSciAddress: ', deSciAddress);

const prePrintAddress = prePrintAddressFile[0].address;
console.log('prePrintAddress: ', prePrintAddress);

const privateKeyowner = "93030c2db7ee1564b43693f99776a27112059dcd9c5cec8052f13444c991e0e7";
const privateKeyAuthor = "ed8b76f4de88432ed45aa3ec420af4d48ea1f46a0175f345662f915b198b94d5";
const privateKeyEditor = "da8a9b0cedfebb0ea13a984034815d637236abb03251457fc6504ff4df7aac22";
const privateKeyReviewer1 = "21a3df5dbc04880ee5134632f5a2947036b0263ac11af3e7f8822fd6a882641f";
const privateKeyReviewer2 = "c2ca3a61e74d553bbec48ddd97954c3be22f65296b3352890c8e35cce4cfcd95";

const provider = new ethers.providers.JsonRpcProvider('http://172.27.192.1:7545');
const ownerSigner = new ethers.Wallet(privateKeyowner, provider);
console.log('owner address: ', ownerSigner.address);
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

const prePrintContract = new ethers.Contract(
    prePrintAddress,
    prePrintABI.abi,
    provider
);


async function submitPrePrint(paperCID) {

    let title = `Test Paper Title: ${paperCID}`;
    console.log('title: ', title)

    const description = {
        authors: [
            {
                name: "test1",
                email: "test1@test.com",
                affiliation: "test1"
            },
            {
                name: "test2",
                email: "test2@test.com",
                affiliation: "test2"
            }
        ],
        fields: [
            {
                field: "test1"
            },
            {
                field: "test2"
            },
            {
                field: "test3"
            }
        ],
        title: title,
        abstract: "If approved, tofersen will become the latest example of the agency’s evolving approach to neurological drug development, " +
            "which could boost industry investment in brain diseases. A vote of confidence for the drug would also supercharge interest in using NFL as a tool to " +
            "measure brain health and to test drugs in future. “This could be the start of a new era,” says Valentina Bonetto, a neuroscientist at the Mario Negri " +
            "Institute for Pharmacological Research in Milan, Italy.",
    }

    const paper = {
        paperCID: paperCID,
        keyInfo: title,
        description: JSON.stringify(description),
    };

    await prePrintContract.connect(authorSigner).submit(paper.paperCID, paper.keyInfo, paper.description);
    console.log('submit pre-print paper: ', paperCID);
};

async function assignEditors() {
    await deSciContract.connect(ownerSigner).pushEditors([editorSigner.address]);
    console.log('assign editors: ', [editorSigner.address]);
};

async function submit(paperCID) {

    const minGasCost = await deSciContract.gasFee(0);
    const donateAmount = ethers.utils.parseEther('0.0005', 'ether');
    let title = `Test Paper Title: ${paperCID}`;
    console.log('title: ', title)

    const description = {
        authors: [
            {
                name: "test1",
                email: "test1@test.com",
                affiliation: "test1"
            },
            {
                name: "test2",
                email: "test2@test.com",
                affiliation: "test2"
            }
        ],
        fields: [
            {
                field: "test1"
            },
            {
                field: "test2"
            },
            {
                field: "test3"
            }
        ],
        title: title,
        abstract: "If approved, tofersen will become the latest example of the agency’s evolving approach to neurological drug development, " +
            "which could boost industry investment in brain diseases. A vote of confidence for the drug would also supercharge interest in using NFL as a tool to " +
            "measure brain health and to test drugs in future. “This could be the start of a new era,” says Valentina Bonetto, a neuroscientist at the Mario Negri " +
            "Institute for Pharmacological Research in Milan, Italy.",
    }

    const paper = {
        paperCID: paperCID,
        keyInfo: title,
        description: JSON.stringify(description),
        amount: donateAmount
    };

    await deSciContract.connect(authorSigner).submitForReview(paper.paperCID, paper.keyInfo, paper.description, paper.amount, { value: paper.amount.add(minGasCost) });
    console.log('submit paper: ', paperCID);
};



async function assignReviewers(paperCID) {
    // await submit(paperCID);
    await deSciContract.connect(editorSigner).reviewerAssign(paperCID, [reviewer1Signer.address, reviewer2Signer.address]);
    console.log('assign reviewers: ', [reviewer1Signer.address, reviewer2Signer.address]);
}

async function reviewPrint(paperCID, reviewerSigner, comment, choice) {
    // await assignReviewers(paperCID);
    await deSciContract.connect(reviewerSigner).reviewPrint(paperCID, comment, choice);
    console.log('review paper: ', paperCID);
}

async function prepare(startIndex, endIndex) {


    await assignEditors();

    for (let i = startIndex; i < endIndex; i++) {
        paperCID = 'paperCID_' + i;
        await submit(paperCID);
        await submitPrePrint(paperCID);
    };

    setTimeout(async () => {
        for (let i = startIndex; i < endIndex; i++) {
            paperCID = 'paperCID_' + i;
            await assignReviewers(paperCID);
        }
    }, 10000);

    setTimeout(async () => {
        for (let i = startIndex; i < endIndex; i++) {
            paperCID = 'paperCID_' + i;
            await reviewPrint(paperCID, reviewer1Signer, 'reviewer1', 3);
            await reviewPrint(paperCID, reviewer2Signer, 'reviewer2', 3);
        }
    }, 20000);

}


prepare(0, 10);




