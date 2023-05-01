import {Backend} from "../data/backend";
import {cpuInfo, cpuSpeedUpdate, cpuTemperatureUpdate, cpuUsageUpdate} from "./cpu";
import {memoryInfo, memoryUsageUpdate} from "./memory";
import {networkAdapter, networkTransferUpdate, pingUpdate, webUpdate} from "./network";
import {partitionInfo} from "./disk";
import {getConfig} from "./config";
import {getAllProcessInfo} from "./process/process";

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

  getConfig = async () => getConfig();
}
