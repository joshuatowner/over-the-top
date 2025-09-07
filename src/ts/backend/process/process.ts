import {ProcessUsageInfo, ProcessDetailInfo} from "../../data/process";
import * as si from "systeminformation";
import {Systeminformation} from "systeminformation";
import {ONE_BYTE, ONE_KIBIBYTE} from "../../ui/constants/data";
import ProcessesProcessData = Systeminformation.ProcessesProcessData;

const SYSTEM_IDLE = "System Idle Process";

export async function getAllProcessInfo(): Promise<ProcessUsageInfo[]> {
  const processInfo = await si.processes();
  return reduceByName(processInfo.list);
}

function mapToProcessDetailInfo(data: ProcessesProcessData): ProcessDetailInfo {
  return {
    pid: data.pid,
    name: data.name,
    command: `${data.command} ${data.params}`,
    cpu: data.cpu,
    mem: data.mem,
  };
}

function reduceByName(data: ProcessesProcessData[]): ProcessUsageInfo[] {
  const nameMap = new Map<string, ProcessUsageInfo>();
  for (const process of data) {
    const name = process.name;
    if (name === SYSTEM_IDLE) continue;

    const current = nameMap.get(name);
    const mem = process.memRss * (ONE_KIBIBYTE / ONE_BYTE);

    const processList = (current?.processes || []);
    processList.push(mapToProcessDetailInfo(process));
    const newEntry: ProcessUsageInfo = {
      name,
      cpu: process.cpu + (current?.cpu || 0),
      mem: mem + (current?.mem || 0),
      processes: processList,
    }
    nameMap.set(name, newEntry);
  }
  return Array.from(nameMap.values());
}