import {CpuInfo, CpuSpeedUpdate, CpuTemperatureUpdate, CpuUsageUpdate} from "./cpu";
import {PartitionInfo} from "./disk";
import {NetworkTransferUpdate, PingUpdate, WebUpdate} from "./network";
import {MemoryInfo, MemoryUsageUpdate} from "./memory";
import {Config} from "../backend/config/interface";
import {ProcessUsageInfo} from "./process";

export interface Backend {

  cpuUsageUpdate(): Promise<CpuUsageUpdate>;
  cpuInfo(): Promise<CpuInfo>;
  cpuSpeedUpdate(): Promise<CpuSpeedUpdate>;
  cpuTemperatureUpdate(): Promise<CpuTemperatureUpdate>;

  memoryInfo(): Promise<MemoryInfo>;
  memoryUsageUpdate(): Promise<MemoryUsageUpdate>;

  networkTransferUpdate(): Promise<NetworkTransferUpdate>;
  webUpdate(): Promise<WebUpdate>;
  pingUpdate(): Promise<PingUpdate>;
  networkAdapter(): Promise<string>;

  processInfo(): Promise<ProcessUsageInfo[]>;

  partitionInfo(): Promise<PartitionInfo[]>;

  getConfig(): Promise<Config>;

}
