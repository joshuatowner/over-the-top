import {AllProcessesInfo} from "../data/process";

export const PROCESS_REQUEST = "PROCESS_REQUEST";
export const PROCESS_RESPONSE = "PROCESS_RESPONSE";

export interface ProcessMessage {
    name: "PROCESS_REQUEST",
    data: {
        numCpu: number,
        numMem: number,
    }
}

export interface ProcessResponse {
    name: "PROCESS_RESPONSE",
    data: AllProcessesInfo,
}

export function isProcessResponseType(item: WorkerResponse): item is ProcessResponse {
    return item.name === PROCESS_RESPONSE
}

export type WorkerMessage = ProcessMessage;

export interface WorkerResponse {
    name: string,
    data: unknown,
}
