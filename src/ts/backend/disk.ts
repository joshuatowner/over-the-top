import * as si from "systeminformation";
import {PartitionInfo} from "../data/disk";
import {isMac, isWindows} from "../util/os";

const PARTITION_TYPE = "part";
const DISK_TYPE = "disk";

const filterName = (name: string) => name.replace("/dev/", "");

function filterType(type: string): boolean {
  if (isWindows) {
    return type === DISK_TYPE;
  } else {
    return type === PARTITION_TYPE;
  }
}

export async function partitionInfo(): Promise<PartitionInfo[]> {
  const info = await si.blockDevices();
  const usages = await si.fsSize();
  return info
    .filter(info => filterType(info.type))
    .map(info => {
      const matchingUsage = usages.find(usage => usage.mount === info.mount);
      return ({
        label: filterName(info.name),
        fsType: info.fstype,
        capacity: matchingUsage?.size,
        usage: matchingUsage?.used,
        usagePercent: matchingUsage?.use
      })
    });
}
