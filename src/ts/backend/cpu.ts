import {CpuInfo, CpuUsageUpdate} from "../data/cpu";
import * as si from "systeminformation";
import IntervalObservable from "../data/intervalObservable";
import {getConfig} from "../config";

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

export const cpuUsage = new IntervalObservable(cpuUsageUpdate, getConfig().cpu.timing.updateInterval);
