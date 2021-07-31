export interface CpuInfo {
  cores: number;
  maxSpeed: number | null;
}

export interface CpuUsageUpdate {
  overallUsage: number,
  coreUsages: number[],
}

export interface CpuSpeedUpdate {
  speed: number;
}

export interface CpuTemperatureUpdate {
  temperature: number;
}
