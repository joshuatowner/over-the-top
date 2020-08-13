import {MemoryInfo, MemoryUsageUpdate} from "../data/memory";
import * as si from "systeminformation";
import {isMac} from "../util/os";


export async function memoryInfo(): Promise<MemoryInfo> {
    const siMemoryInfo = await si.mem();
    return {
        capacity: siMemoryInfo.total,
    }
}

export async function memoryUsageUpdate(): Promise<MemoryUsageUpdate> {
    const siMemoryInfo = await si.mem();
    const used = isMac ? siMemoryInfo.used : siMemoryInfo.active;
    return {
        usage: used / siMemoryInfo.total,
        usageBytes: used,
    }
}
