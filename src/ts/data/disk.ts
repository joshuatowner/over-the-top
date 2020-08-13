export interface DiskInfo {
    usage: number,
    capacity: number,
}

export interface DiskTransferUpdate {
    write: number,
    read: number,
}

export interface DiskUsageUpdate {
    usage: number,
}
