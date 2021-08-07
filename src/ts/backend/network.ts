import {getConfig} from "./config";
import {DEFAULT_NETWORK_ADAPTER} from "./config/const";
import * as si from "systeminformation";
import {NetworkTransferUpdate, PingUpdate, WebUpdate} from "../data/network";

let defaultNetworkInterface: string | undefined;

export async function networkTransferUpdate(): Promise<NetworkTransferUpdate> {
  const siNetworkStats = await si.networkStats(await networkAdapter());
  return {
    up: siNetworkStats[0].tx_sec,
    down: siNetworkStats[0].rx_sec,
  }
}

export async function pingUpdate(): Promise<PingUpdate> {
  const siPingStats = await si.inetLatency(getPingIp());
  return {
    latency: siPingStats, // TODO what about fail??
  }
}

export async function webUpdate(): Promise<WebUpdate> {
  const siWebStats = await si.inetChecksite(getWebUrl());
  return {
    latency: siWebStats.ms,
    responseCode: siWebStats.status,
  }
}

export async function networkAdapter(): Promise<string> {
  const configAdapter = getConfig().network.interface;
  return configAdapter === DEFAULT_NETWORK_ADAPTER ? await getDefaultInterface() : configAdapter;
}

export async function getDefaultInterface() {
  if (!defaultNetworkInterface) {
    defaultNetworkInterface = await si.networkInterfaceDefault();
  }
  return defaultNetworkInterface;
}

export async function getAllInterfaces(): Promise<string[]> {
  const response = await si.networkInterfaces();
  return response.map(int => int.iface);
}

function getPingIp() {
  return getConfig().network.pingIp;
}

function getWebUrl() {
  return getConfig().network.webUrl;
}
