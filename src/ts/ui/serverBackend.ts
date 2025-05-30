import {Backend} from "../data/backend";
import ROUTES from "../data/routes";
import {ipcRenderer} from "electron";
import {Config} from "../backend/config/interface";

export class ServerBackend implements Backend {

  protected connection: (route: string, input?: string) => Promise<string>;

  constructor(connection: (route: string, input?: string) => Promise<string>) {
    this.connection = connection;
  }

  cpuInfo = async () => JSON.parse(await this.connection(ROUTES.CPU_INFO));
  cpuSpeedUpdate = async () => JSON.parse(await this.connection(ROUTES.CPU_SPEED));
  cpuTemperatureUpdate = async () => JSON.parse(await this.connection(ROUTES.CPU_TEMPERATURE));
  cpuUsageUpdate = async () => JSON.parse(await this.connection(ROUTES.CPU_USAGE));

  memoryInfo = async () => JSON.parse(await this.connection(ROUTES.MEMORY_INFO));
  memoryUsageUpdate = async () => JSON.parse(await this.connection(ROUTES.MEMORY_USAGE));

  networkAdapter = async () => JSON.parse(await this.connection(ROUTES.NETWORK_ADAPTER));
  networkTransferUpdate = async () => JSON.parse(await this.connection(ROUTES.NETWORK_USAGE));
  pingUpdate = async () => JSON.parse(await this.connection(ROUTES.NETWORK_PING));
  webUpdate = async () => JSON.parse(await this.connection(ROUTES.NETWORK_WEB));

  processInfo = async () => JSON.parse(await this.connection(ROUTES.PROCESS_INFO));

  partitionInfo = async () => JSON.parse(await this.connection(ROUTES.DISK_PARTITION_INFO));

  gpuUsageUpdate = async () => JSON.parse(await this.connection(ROUTES.GPU_USAGE));

  getConfig = async () => JSON.parse(await this.connection(ROUTES.CONFIG));
  updateConfig = async (config: Config) => {
    await this.connection(ROUTES.UPDATE_CONFIG, JSON.stringify(config));
    return;
  }

}

export class IpcBackend extends ServerBackend implements Backend {
  constructor() {
    const getResult = (route: string, input?: string) => ipcRenderer.invoke(route, input);
    super(getResult);
  }
}
