import {MemoryInfo, MemoryUsageUpdate} from "../data/memory";
import * as si from "systeminformation";
import {isMac} from "../util/os";
import IntervalObservable from "../data/observable/intervalObservable";
import {getConfig} from "../config";
import {MemorySystemInformation} from "../data/system";


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

export const memoryUsage = new IntervalObservable(memoryUsageUpdate, getConfig().memory.timing.updateInterval);
