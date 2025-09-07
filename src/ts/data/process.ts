export interface ProcessDetailInfo {
  pid: number;
  name: string;
  command: string; // Command line of the process
  cpu: number;     // CPU usage of individual PID
  mem: number;     // Memory usage of individual PID
}

export interface ProcessUsageInfo {
  name: string,
  cpu: number,
  mem: number,
  processes: ProcessDetailInfo[],
}