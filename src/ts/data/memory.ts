export interface MemoryInfo {
    memoryCapacity: number,
    swapCapacity: number,
}

export interface MemoryUsageUpdate {
    memoryUsage: number,
    memoryUsageBytes: number,
    swapUsage: number,
    swapUsageBytes: number,
}

export interface SwapUsageUpdate {
    usage: number,
}
