import {ProcessUsageInfo} from "../../data/process";
import * as si from "systeminformation";
import {Systeminformation} from "systeminformation";
import {ONE_BYTE, ONE_KIBIBYTE} from "../../ui/constants/data";
import ProcessesProcessData = Systeminformation.ProcessesProcessData;

const SYSTEM_IDLE = "System Idle Process";

export async function getAllProcessInfo(): Promise<ProcessUsageInfo[]> {
  const processInfo = await si.processes();
  return reduceByName(processInfo.list);
}

function reduceByName(data: ProcessesProcessData[]): ProcessUsageInfo[] {
  const nameMap = new Map<string, ProcessUsageInfo>();
  for (const process of data) {
    const name = process.name;
    if (name === SYSTEM_IDLE) continue;
    const current = nameMap.get(name);
    const mem = process.memRss * (ONE_KIBIBYTE / ONE_BYTE);
    const newEntry = {
      name,
      cpu: process.cpu + (current?.cpu || 0),
      mem: mem + (current?.mem || 0),
    }
    nameMap.set(name, newEntry);
  }
  return Array.from(nameMap.values());
}
