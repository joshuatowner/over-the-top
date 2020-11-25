export interface ProcessInfo {
  name: string,
  usage: number,
}

export interface AllProcessesInfo {
  memoryProcs: ProcessInfo[],
  cpuProcs: ProcessInfo[],
}
