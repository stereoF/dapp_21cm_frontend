import { ethers } from "ethers";
import { useProvider } from '@/scripts/ethProvider'
import contractABI from "@/contracts/desci/DeSciPrint.json";
import { useStatus } from '@/scripts/status';


export async function usePaperInfo(address: string, paperCID: string) {


    const { provider } = await useProvider();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    const contract = new ethers.Contract(
        address,
        contractABI.abi,
        provider
    );
    const { ProcessStatus, ReviewerStatus } = useStatus();

    const journalEditors = await contract.editors();
    let printInfo = await contract.deSciPrints(paperCID);
    let process = await contract.deSciProcess(paperCID);
    let reviewers = await contract.getReviewers(paperCID);
    let processIndex: number = process.processStatus;

    let reviewerCnt = reviewers.length;
    let reviewInfo = reviewers.map(async (reviewer: string, index: number) => {
        return {
            reviewer: reviewer,
            ...await (contract.deSciReviews(paperCID, reviewer)),
        }
        // return {
        //   reviewer: await contract.deSciReviews(paperCID, reviewer),
        // }
    })

    let reviseCnt = 0;
    let passCnt = 0;
    let rejectCnt = 0;
    let replyCnt = 0;
    let reviewResult = await Promise.all(reviewInfo);

    let reviewResultShow: any = [];

    for (let i = 0; i < reviewResult.length; i++) {
        if (reviewResult[i].reviewerStatus === 1) {
            reviseCnt++;
        } else if (reviewResult[i].reviewerStatus === 3) {
            passCnt++;
        } else if (reviewResult[i].reviewerStatus === 2) {
            rejectCnt++;
        }

        if (reviewResult[i].reply !== '') {
            replyCnt++;
        }

        // reviewResultShow.push( Object.entries(reviewResult[i]).map(([key, value]) => ({label: key, value})))
        reviewResultShow.push(
            {
                name: reviewResult[i].reviewer,
                obj: [
                    {
                        label: "comment",
                        value: reviewResult[i].comment,
                    },
                    {
                        label: "reply",
                        value: reviewResult[i].reply,
                    },
                    {
                        label: "reviewerStatus",
                        value: ReviewerStatus[reviewResult[i].reviewerStatus],
                    },
                    {
                        label: "commentTime",
                        value: reviewResult[i].commentTime != 0 ? new Date(reviewResult[i].commentTime * 1000).toLocaleString() : '',
                    },
                    {
                        label: "replyTime",
                        value: reviewResult[i].replyTime != 0 ? new Date(reviewResult[i].replyTime * 1000).toLocaleString() : '',
                    },
                ]
            }
        )
    }

    reviewers = reviewers ? reviewers : [];
    let status = ProcessStatus[processIndex];

    const basicInfo = [
        {
            label: 'Title',
            value: printInfo.keyInfo,
        },
        {
            label: 'Status',
            value: status
        },
        {
            label: 'Submit Time',
            value: printInfo.submitTime != 0 ? new Date(printInfo.submitTime * 1000).toLocaleString() : '',
        },
        {
            label: 'Number of Reviewers',
            value: reviewerCnt,
        },
        {
            label: 'Number of Revise',
            value: reviseCnt,
        },
        {
            label: 'Number of Pass',
            value: passCnt,
        },
        {
            label: 'Number of Reject',
            value: rejectCnt,
        },
        {
            label: 'Number of Reply',
            value: replyCnt,
        },
    ]

    let paperEditor = process.editor === ethers.constants.AddressZero ? '' : process.editor;

    const web3Info = [
        {
            label: 'Paper CID',
            value: paperCID,
        },
        {
            label: 'Submitted by',
            value: printInfo.submitAddress,
        },
        {
            label: 'Editor',
            value: paperEditor,
        },
        {
            label: 'Reviewers',
            value: reviewers.join(', '),
        }
    ]

    let prevCID = printInfo.prevCID;
    let nextCID = printInfo.nextCID;

    return { basicInfo, web3Info, reviewResultShow, prevCID, nextCID, journalEditors, reviewers }

}