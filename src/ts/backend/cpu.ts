import {CpuInfo, CpuSpeedUpdate, CpuTemperatureUpdate, CpuUsageUpdate} from "../data/cpu";
import * as si from "systeminformation";
import IntervalObservable from "../data/observable/intervalObservable";
import {getConfig} from "./config";
import {CPUSystemInformation} from "../data/system";

export async function cpuInfo(): Promise<CpuInfo> {
  const siCpuInfo = await si.cpu();
  const speed = Number(siCpuInfo.speedMax);
  return {
    cores: siCpuInfo.cores,
    maxSpeed: isNaN(speed) ? null : speed
  }
}

export async function cpuUsageUpdate(): Promise<CpuUsageUpdate> {
  const siCpuUpdate = await si.currentLoad();
  const coreUsages = siCpuUpdate.cpus.map(coreUsage => coreUsage.load / 100);
  const overallUsage = siCpuUpdate.currentLoad / 100;
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
  const siSpeedUpdate = await si.cpuCurrentSpeed();
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
