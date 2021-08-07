import {MemoryInfo, MemoryUsageUpdate} from "../../data/memory";
import * as si from "systeminformation";
import {isMac} from "../../util/os";
import IntervalObservable from "../../data/observable/intervalObservable";
import {getConfig} from "../config";
import {MemorySystemInformation} from "../../data/system";
import {macMem} from "./mac";


export async function memoryInfo(): Promise<MemoryInfo> {
  const siMemoryInfo = await si.mem();
  return {
    memoryCapacity: siMemoryInfo.total,
    swapCapacity: siMemoryInfo.swaptotal,
  }
}

export async function memoryUsageUpdate(): Promise<MemoryUsageUpdate> {
  const siMemoryInfo = isMac ? await macMem() : await si.mem();
  return {
    memoryActiveUsage: siMemoryInfo.active / siMemoryInfo.total,
    memoryActiveUsageBytes: siMemoryInfo.active,
    memoryCacheUsage: siMemoryInfo.buffcache / siMemoryInfo.total,
    memoryCacheUsageBytes: siMemoryInfo.buffcache,
    memCapacity: siMemoryInfo.total,
    swapUsage: siMemoryInfo.swapused / siMemoryInfo.swaptotal,
    swapUsageBytes: siMemoryInfo.swapused,
    swapCapacity: siMemoryInfo.swaptotal,
  }
}

const UNKNOWN_MEMORY_TYPE_WINDOWS = "Unknown";

const filterType = (type: string) => type === UNKNOWN_MEMORY_TYPE_WINDOWS ? undefined : type;

export async function getMemorySystemInformation(): Promise<MemorySystemInformation> {
  const info = await si.memLayout();
  return {
    sticks: info.map(item => ({
      type: item.type,
      formFactor: item.formFactor,
      clockSpeed: item.clockSpeed,
      voltage: item.voltageConfigured,
    }))
  }
}

