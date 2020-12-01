import {getModelInformation, getOSInformation} from "../../backend/system";
import {getCPUInfo} from "../../backend/cpu";
import {cpu, mem} from "systeminformation";
import {getMemorySystemInformation} from "../../backend/memory";
import {toCSV} from "../util/list";
import {notUndefined, onlyUnique} from "../../util/array";

export interface DetailGroup {
  title: string,
  details: Detail[]
}

export interface Detail {
  name: string;
  value: string;
}

export async function getDetails(): Promise<DetailGroup[]> {
  return [
    await getModelDetails(),
    await getOSDetails(),
    await getCPUDetails(),
    await getMemoryDetails()
  ].filter(notUndefined);
}

async function getOSDetails(): Promise<DetailGroup> {
  const osInfo = await getOSInformation();
  return {
    title: "Operating System",
    details: [
      {name: "OS", value: osInfo.type},
      {name: "Version", value: osInfo.version},
      {name: "Arch", value: osInfo.architecture},
    ]
  }
}

async function getCPUDetails(): Promise<DetailGroup> {
  const cpuInfo = await getCPUInfo();
  return {
    title: "CPU",
    details: [
      {name: "Mfr", value: cpuInfo.manufacturer},
      {name: "Brand", value: cpuInfo.model},
      {name: "Speed", value: cpuInfo.speedMHz + " MHz"},
      {name: "Cores", value: cpuInfo.cores.toFixed(0)},
      {name: "Phs Cores", value: cpuInfo.physicalCores.toFixed(0)},
      {name: "# Procrs", value: cpuInfo.processors.toFixed(0)},
    ]
  }
}

async function getModelDetails(): Promise<DetailGroup> {
  const modelInfo = await getModelInformation();
  return {
    title: "Model",
    details: [
      {name: "Mfr", value: modelInfo.manufacturer},
      {name: "Brand", value: modelInfo.model},
    ]
  }
}

async function getMemoryDetails(): Promise<DetailGroup | undefined> {
  const memInfo = await getMemorySystemInformation();
  const types = memInfo.sticks
    .map(stick => stick.type)
    .filter(onlyUnique)
    .filter(notUndefined);
  const clockSpeeds = memInfo.sticks
    .map(stick => stick.clockSpeed)
    .filter(onlyUnique)
    .filter(notUndefined)
    .map(number => number?.toFixed(0));
  const formFactors = memInfo.sticks
    .map(stick => stick.formFactor)
    .filter(notUndefined)
    .filter(onlyUnique);
  const voltage = memInfo.sticks
    .map(stick => stick.voltage)
    .filter(notUndefined)
    .filter(voltage => voltage > 0)
    .filter(onlyUnique)
    .map(number => number?.toFixed(0));
  const details: Detail[] = [];
  console.log(types);
  if (types.length > 0) {
    details.push({name: "Type", value: toCSV(types)});
  }
  if (clockSpeeds.length > 0) {
    details.push({name: "Clock Speed", value: toCSV(clockSpeeds)});
  }
  if (formFactors.length > 0) {
    details.push({name: "Form Factor", value: toCSV(formFactors)});
  }
  if (voltage.length > 0) {
    details.push({name: "Voltage", value: toCSV(voltage)});
  }
  return details.length > 0 ? { title: "Memory", details } : undefined;
}
