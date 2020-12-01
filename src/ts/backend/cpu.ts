import {CpuInfo, CpuUsageUpdate} from "../data/cpu";
import * as si from "systeminformation";
import IntervalObservable from "../data/intervalObservable";
import {getConfig} from "../config";
import {CPUSystemInformation} from "../data/system";

export async function cpuInfo(): Promise<CpuInfo> {
  const siCpuInfo = await si.cpu();
  return {
    cores: siCpuInfo.cores,
  }
}

export async function cpuUsageUpdate(): Promise<CpuUsageUpdate> {
  const siCpuUpdate = await si.currentLoad();
  const coreUsages = siCpuUpdate.cpus.map(coreUsage => coreUsage.load / 100);
  const overallUsage = siCpuUpdate.currentload / 100;
  return {
    overallUsage,
    coreUsages,
  }
}

export async function getCPUInfo(): Promise<CPUSystemInformation> {
  const info = await si.cpu();
  return {
    manufacturer: info.manufacturer,
    model: info.brand,
    speedMHz: info.speed,
    cores: info.cores,
    physicalCores: info.physicalCores,
    processors: info.processors,
  }
}

export const cpuUsage = new IntervalObservable(cpuUsageUpdate, getConfig().cpu.timing.updateInterval);
