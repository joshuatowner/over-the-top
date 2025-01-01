import * as si from "systeminformation";
import {PartitionInfo} from "../data/disk";

const PARTITION_TYPE = "part";

const filterName = (name: string) => name.replace("/dev/", "");

export async function partitionInfo(): Promise<PartitionInfo[]> {
  // const info = await si.blockDevices();
  // const usages = await si.fsSize();
  // return info
  //   .filter(info => info.type === PARTITION_TYPE)
  //   .map(info => {
  //     const matchingUsage = usages.find(usage => usage.mount === info.mount);
  //     return ({
  //       label: filterName(info.name),
  //       fsType: info.fsType,
  //       capacity: matchingUsage?.size,
  //       usage: matchingUsage?.used,
  //       usagePercent: matchingUsage?.use
  //     })
  //   })
  //   .filter(info => info.usage);
  const usages = await si.fsSize();
  return usages
    .filter(info => info.rw)
    .map(info => {
      const matchingUsage = usages.find(usage => usage.mount === info.mount);
      return ({
        label: filterName(info.fs),
        fsType: info.type,
        capacity: matchingUsage?.size,
        usage: matchingUsage?.used,
        usagePercent: matchingUsage?.use
      })
    });
}
