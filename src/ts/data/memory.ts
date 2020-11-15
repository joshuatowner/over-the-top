export interface MemoryInfo {
    memoryCapacity: number,
    swapCapacity: number,
}

export interface MemoryUsageUpdate {
    memoryUsage: number,
    memoryUsageBytes: number,
    memCapacity: number,
    swapUsage: number,
    swapUsageBytes: number,
    swapCapacity: number,
}

export interface SwapUsageUpdate {
    usage: number,
}
