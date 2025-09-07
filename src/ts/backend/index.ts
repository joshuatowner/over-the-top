import {Backend} from "../data/backend";
import {cpuInfo, cpuSpeedUpdate, cpuTemperatureUpdate, cpuUsageUpdate} from "./cpu";
import {memoryInfo, memoryUsageUpdate} from "./memory";
import {networkAdapter, networkTransferUpdate, pingUpdate, webUpdate} from "./network";
import {partitionInfo} from "./disk";
import {getConfig, updateConfig} from "./config";
import {getAllProcessInfo} from "./process/process";
import {gpuUsageUpdate} from "./gpu";
import { killProcess } from './process/killer'; // Import the killer function
import { KillProcessInput, KillProcessOutput } from '../data/process';

export default class NodeBackend implements Backend {

  cpuSpeedUpdate = cpuSpeedUpdate;
  cpuTemperatureUpdate = cpuTemperatureUpdate;
  cpuUsageUpdate = cpuUsageUpdate;
  cpuInfo = cpuInfo;

  memoryInfo = memoryInfo;
  memoryUsageUpdate = memoryUsageUpdate;

  networkAdapter = networkAdapter;
  networkTransferUpdate = networkTransferUpdate;
  pingUpdate = pingUpdate;
  webUpdate = webUpdate;

  partitionInfo = partitionInfo;

  processInfo = getAllProcessInfo;

  gpuUsageUpdate = gpuUsageUpdate;

  getConfig = async () => getConfig();
  updateConfig = updateConfig;

  killProcess = killProcess;

}
