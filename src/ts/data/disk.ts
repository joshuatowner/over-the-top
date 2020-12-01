export enum DiskType {
  hdd = "HDD"
}

export interface PartitionInfo {
  label: string,
  fsType: string,
  capacity?: number,
  usage?: number,
  usagePercent?: number
}

export interface DiskTransferUpdate {
  write: number,
  read: number,
}

export interface PartitionUsageUpdate {
  capacity: number,
  usage: number,
}
