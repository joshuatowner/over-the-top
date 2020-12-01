export interface ModelInformation {
  manufacturer: string;
  model: string;
}

export interface OSInformation {
  type: string;
  version: string;
  architecture: string;
}

export interface CPUSystemInformation {
  manufacturer: string;
  model: string;
  speedMHz: string;
  cores: number;
  physicalCores: number;
  processors: number;
}

export interface MemorySystemInformation {
  sticks: MemoryStickInformation[];
}

export interface MemoryStickInformation {
  type?: string;
  formFactor?: string;
  clockSpeed?: number;
  voltage?: number;
}

export interface SystemInformation {
  model: ModelInformation;
  os: OSInformation;
  cpu: CPUSystemInformation;
  memory: MemorySystemInformation;
}
