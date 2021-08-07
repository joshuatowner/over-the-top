import IntervalObservable from "../../data/observable/intervalObservable";
import {Backend} from "../../data/backend";
import {memoObservable} from "./memo";


export const cpuUsage = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.cpuUsageUpdate, window.config.cpu.timing.updateInterval));
export const cpuSpeed = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.cpuSpeedUpdate, window.config.cpu.timing.speedInterval));
export const cpuTemp = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.cpuTemperatureUpdate, window.config.cpu.timing.tempInterval));
