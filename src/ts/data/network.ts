export interface NetworkTransferUpdate {
  up: number,
  down: number,
}

export interface PingUpdate {
  latency?: number,
}

export interface WebUpdate {
  latency?: number,
  responseCode: number,
}

export interface NetworkSpeedUpdate {
  up: number,
  down: number,
  latency: number,
}
