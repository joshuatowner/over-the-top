import {AllProcessesInfo} from "../../data/process";
import * as si from "systeminformation";
import {Systeminformation} from "systeminformation";
import ProcessesProcessData = Systeminformation.ProcessesProcessData;
import {isLinux, isMac} from "../../util/os";
import {ONE_BYTE, ONE_KIBIBYTE} from "../../ui/constants/data";

const SYSTEM_IDLE = "System Idle Process";

interface ProcessUsageInfo {
    name: string,
    cpu: number,
    mem: number,
}

export async function getAllProcessInfo(numCpu: number, numMem: number): Promise<AllProcessesInfo> {
    const processInfo = await si.processes();
    const allProcesses = reduceByName(processInfo.list);
    const byCpu = Array.from(allProcesses)
        .sort((first, second) => second.cpu - first.cpu)
        .slice(0, numCpu)
        .map(proc => ({ name: proc.name, usage: proc.cpu }));
    const byMem = Array.from(allProcesses)
        .sort((first, second) => second.mem - first.mem)
        .slice(0, numMem)
        .map(proc => ({ name: proc.name, usage: proc.mem }));
    return {
        cpuProcs: byCpu,
        memoryProcs: byMem,
    }
}

function reduceByName(data: ProcessesProcessData[]): ProcessUsageInfo[] {
    const nameMap = new Map<string, ProcessUsageInfo>();
    for (const process of data) {
        const name = process.name;
        if (name === SYSTEM_IDLE) continue;
        const current = nameMap.get(name);
        const mem = process.mem_rss * (ONE_KIBIBYTE / ONE_BYTE);
        const newEntry = {
            name,
            cpu: process.pcpu + (current?.cpu || 0),
            mem: mem + (current?.mem || 0),
        }
        nameMap.set(name, newEntry);
    }
    return Array.from(nameMap.values());
}
