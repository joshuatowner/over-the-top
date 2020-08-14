import {MemoryInfo, MemoryUsageUpdate} from "../data/memory";
import * as si from "systeminformation";
import {isMac} from "../util/os";


export async function memoryInfo(): Promise<MemoryInfo> {
    const siMemoryInfo = await si.mem();
    return {
        memoryCapacity: siMemoryInfo.total,
        swapCapacity: siMemoryInfo.swaptotal,
    }
}

export async function memoryUsageUpdate(): Promise<MemoryUsageUpdate> {
    const siMemoryInfo = await si.mem();
    const used = isMac ? siMemoryInfo.used : siMemoryInfo.active;
    return {
        memoryUsage: used / siMemoryInfo.total,
        memoryUsageBytes: used,
        swapUsage: siMemoryInfo.swapused / siMemoryInfo.swaptotal,
        swapUsageBytes: siMemoryInfo.swapused,
    }
}
