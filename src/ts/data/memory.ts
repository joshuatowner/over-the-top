export interface MemoryInfo {
  memoryCapacity: number,
  swapCapacity: number,
}

export interface MemoryUsageUpdate {
  memoryActiveUsage: number,
  memoryActiveUsageBytes: number,
  memoryCacheUsage: number,
  memoryCacheUsageBytes: number,
  memCapacity: number,
  swapUsage: number,
  swapUsageBytes: number,
  swapCapacity: number,
}

export interface SwapUsageUpdate {
  usage: number,
}
