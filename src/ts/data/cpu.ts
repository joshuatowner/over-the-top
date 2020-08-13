export interface CpuInfo {
    cores: number,
}

export interface CpuUsageUpdate {
    overallUsage: number,
    coreUsages: number[],
}
