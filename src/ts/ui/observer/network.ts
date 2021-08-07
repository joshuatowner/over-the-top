import IntervalObservable from "../../data/observable/intervalObservable";
import {Backend} from "../../data/backend";
import {memoObservable} from "./memo";


export const networkUsage = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.networkTransferUpdate, window.config.network.timing.bandwidthUpdateInterval));
export const ping = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.pingUpdate, window.config.network.timing.pingUpdateInterval));
export const webRequest = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.webUpdate, window.config.network.timing.webUpdateInterval));
export const networkAdapter = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.networkAdapter, window.config.network.timing.bandwidthUpdateInterval));
