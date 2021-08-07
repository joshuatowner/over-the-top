import {CpuInfo, CpuSpeedUpdate, CpuTemperatureUpdate, CpuUsageUpdate} from "./cpu";
import {PartitionInfo} from "./disk";
import {NetworkTransferUpdate, PingUpdate, WebUpdate} from "./network";
import {MemoryUsageUpdate} from "./memory";
import {Config} from "../backend/config/interface";

export interface Backend {

  cpuUsageUpdate(): Promise<CpuUsageUpdate>;
  cpuInfo(): Promise<CpuInfo>;
  cpuSpeedUpdate(): Promise<CpuSpeedUpdate>;
  cpuTemperatureUpdate(): Promise<CpuTemperatureUpdate>;

  memoryUsageUpdate(): Promise<MemoryUsageUpdate>;

  networkTransferUpdate(): Promise<NetworkTransferUpdate>;
  webUpdate(): Promise<WebUpdate>;
  pingUpdate(): Promise<PingUpdate>;
  networkAdapter(): Promise<string>;

  partitionInfo(): Promise<PartitionInfo[]>;

  getConfig(): Promise<Config>;

}
