import {Backend} from "../../data/backend";
import ROUTES from "../../data/routes";

export default function registerBackend(
  backend: Backend, addRoute: (route: string, result: () => Promise<unknown>) => unknown
) {

  addRoute(ROUTES.CONFIG, backend.getConfig);

  addRoute(ROUTES.CPU_SPEED, backend.cpuSpeedUpdate);
  addRoute(ROUTES.CPU_TEMPERATURE, backend.cpuTemperatureUpdate);
  addRoute(ROUTES.CPU_USAGE, backend.cpuUsageUpdate);
  addRoute(ROUTES.CPU_INFO, backend.cpuInfo);

  addRoute(ROUTES.MEMORY_USAGE, backend.memoryUsageUpdate);

  addRoute(ROUTES.NETWORK_ADAPTER, backend.networkAdapter);
  addRoute(ROUTES.NETWORK_USAGE, backend.networkTransferUpdate);
  addRoute(ROUTES.NETWORK_PING, backend.pingUpdate);
  addRoute(ROUTES.NETWORK_WEB, backend.webUpdate);

  addRoute(ROUTES.DISK_PARTITION_INFO, backend.partitionInfo);

}
