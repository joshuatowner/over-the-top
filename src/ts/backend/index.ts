import {Backend} from "../data/backend";
import {cpuInfo, cpuSpeedUpdate, cpuTemperatureUpdate, cpuUsageUpdate, getCPUInfo} from "./cpu";
import {memoryUsageUpdate} from "./memory";
import {networkAdapter, networkTransferUpdate, pingUpdate, webUpdate} from "./network";
import {partitionInfo} from "./disk";
import {getConfig} from "./config";

export default class NodeBackend implements Backend {

  cpuSpeedUpdate = cpuSpeedUpdate;
  cpuTemperatureUpdate = cpuTemperatureUpdate;
  cpuUsageUpdate = cpuUsageUpdate;
  cpuInfo = cpuInfo;

  memoryUsageUpdate = memoryUsageUpdate;

  networkAdapter = networkAdapter;
  networkTransferUpdate = networkTransferUpdate;
  pingUpdate = pingUpdate;
  webUpdate = webUpdate;

  partitionInfo = partitionInfo;
  getConfig = async () => getConfig();
}
