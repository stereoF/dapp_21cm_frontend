import * as IPFS from 'ipfs-core'


export async function useIPFS(fileObjectsArray: any[]) {
    const ipfs = IPFS.create();
    let result:any[] = []
    for await (const resultPart of (await ipfs).addAll(fileObjectsArray, { wrapWithDirectory: true })) {
      result.push(resultPart)
      // console.log(resultPart.path, resultPart.cid.toString())
    }
    let cid = result.find(e => e.path==="").cid.toString()
    return { cid };
  }