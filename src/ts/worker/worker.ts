export = 0;

import {PROCESS_RESPONSE, WorkerMessage, WorkerResponse} from "./interface";
import {getAllProcessInfo} from "../backend/process/process";

async function getProcessInfo(numCpu: number, numMem: number): Promise<void>  {
    const data = await getAllProcessInfo(numCpu, numMem);
    const message = {
        name: PROCESS_RESPONSE,
        data
    } as WorkerResponse
    // @ts-ignore
    postMessage(message);
}

onmessage = (event) => {
    const data = event.data as WorkerMessage;
    getProcessInfo(data.data.numCpu, data.data.numMem).then();
}
