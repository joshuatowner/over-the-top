import {isProcessResponseType, ProcessMessage, WorkerResponse} from "./interface";
import {AllProcessesInfo} from "../data/process";

const worker = new Worker(__dirname + '/worker.js');

type responseTypeGuard<T extends WorkerResponse> = (response: WorkerResponse) => response is T;

function sendMessage<T, U extends WorkerResponse>(
    message: T,
    guard: responseTypeGuard<U>,
    timeout = 1000
): Promise<U | undefined> {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => resolve(undefined), timeout);
        worker.onmessage = (event) => {
            clearTimeout(timer);
            const response = event.data as WorkerResponse;
            if (guard(response)) {
                resolve(response);
            }
        }
        worker.postMessage(message);
    });
}

export async function sendProcessRequest(numCpu: number, numMem: number): Promise<AllProcessesInfo | undefined> {
    const message = {
        name: "PROCESS_REQUEST",
        data: {
            numCpu, numMem
        }
    }
    return (await sendMessage(message, isProcessResponseType))?.data;
}
