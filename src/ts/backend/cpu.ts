import {CpuInfo, CpuSpeedUpdate, CpuTemperatureUpdate, CpuUsageUpdate} from "../data/cpu";
import * as si from "systeminformation";
import IntervalObservable from "../data/intervalObservable";
import {getConfig} from "../config";
import {CPUSystemInformation} from "../data/system";

export async function cpuInfo(): Promise<CpuInfo> {
  const siCpuInfo = await si.cpu();
  const speed = Number(siCpuInfo.speedmax);
  return {
    cores: siCpuInfo.cores,
    maxSpeed: isNaN(speed) ? null : speed
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

export async function cpuSpeedUpdate(): Promise<CpuSpeedUpdate> {
  const siSpeedUpdate = await si.cpuCurrentspeed();
  return {
    speed: siSpeedUpdate.avg,
  }
}

export async function cpuTemperatureUpdate(): Promise<CpuTemperatureUpdate> {
  const siTempUpdate = await si.cpuTemperature();
  return {
    temperature: siTempUpdate.main,
  }
}

export const cpuUsage = new IntervalObservable(cpuUsageUpdate, getConfig().cpu.timing.updateInterval);
export const cpuSpeed = new IntervalObservable(cpuSpeedUpdate, getConfig().cpu.timing.speedInterval);
export const cpuTemp = new IntervalObservable(cpuTemperatureUpdate, getConfig().cpu.timing.tempInterval);
