import {getConfig} from "../config";
import {DEFAULT_NETWORK_ADAPTER} from "../config/const";
import * as si from "systeminformation";
import {NetworkTransferUpdate, PingUpdate, WebUpdate} from "../data/network";
import IntervalObservable from "../data/intervalObservable";

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
    if (configAdapter === DEFAULT_NETWORK_ADAPTER) {
        if (!defaultNetworkInterface) {
            defaultNetworkInterface = await si.networkInterfaceDefault();
        }
        return defaultNetworkInterface;
    } else {
        return configAdapter;
    }
}

function getPingIp() {
    return getConfig().network.pingIp;
}

function getWebUrl() {
    return getConfig().network.webUrl;
}

export const networkUsage = new IntervalObservable(networkTransferUpdate, getConfig().network.timing.bandwidthUpdateInterval);
