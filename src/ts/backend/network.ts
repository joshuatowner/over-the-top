import {getConfig} from "../config";
import {DEFAULT_NETWORK_ADAPTER} from "../config/const";
import * as si from "systeminformation";
import {NetworkTransferUpdate, PingUpdate, WebUpdate} from "../data/network";
import IntervalObservable from "../data/observable/intervalObservable";
import TriggeredObservable from "../data/observable/triggeredObservable";

let defaultNetworkInterface: string | undefined;

export async function networkTransferUpdate(): Promise<NetworkTransferUpdate> {
  const siNetworkStats = await si.networkStats(await getNetworkAdapter());
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

async function getNetworkAdapter(): Promise<string> {
  const configAdapter = getConfig().network.interface;
  const adapter = configAdapter === DEFAULT_NETWORK_ADAPTER ? await getDefaultInterface() : configAdapter;
  networkAdapter.pushUpdate(adapter);
  return adapter;
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

export const networkUsage = new IntervalObservable(networkTransferUpdate, getConfig().network.timing.bandwidthUpdateInterval);
export const ping = new IntervalObservable(pingUpdate, getConfig().network.timing.pingUpdateInterval);
export const webRequest = new IntervalObservable(webUpdate, getConfig().network.timing.webUpdateInterval);
export const networkAdapter = new TriggeredObservable<string>(true);
