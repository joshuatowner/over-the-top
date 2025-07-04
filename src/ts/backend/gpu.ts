import * as si from "systeminformation";
import {GpuUsageUpdate} from "../data/gpu";
import {ONE_MEBIBYTE} from "../ui/constants/data";

export async function gpuUsageUpdate(): Promise<GpuUsageUpdate> {
  const siGpuUsage = await si.graphics();
  const nvidiaGpus = siGpuUsage.controllers
    .filter(controller => controller.memoryUsed !== undefined);
  if (nvidiaGpus.length === 0) {
    return {
      vramUsageBytes: 0,
      vramCapacityBytes: 1,
      gpuUsage: 0,
    }
  }
  const gpu = nvidiaGpus[0];
  return {
    vramUsageBytes: (gpu.memoryUsed ?? 0) * ONE_MEBIBYTE,
    vramCapacityBytes: (gpu.memoryTotal ?? 1) * ONE_MEBIBYTE,
    gpuUsage: gpu.utilizationGpu ?? 0,
  }
}

export async function gpuPresent(): Promise<boolean> {
  const siGpuUsage = await si.graphics();
  const nvidiaGpus = siGpuUsage.controllers
    .filter(controller => controller.memoryUsed !== undefined);
  return nvidiaGpus.length > 0;
}1