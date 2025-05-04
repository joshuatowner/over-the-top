import IntervalObservable from "../../data/observable/intervalObservable";
import {Backend} from "../../data/backend";
import {memoObservable} from "./memo";
import DEFAULT_CONFIG from "../../backend/config/default";

export const gpuUsage = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.gpuUsageUpdate, window.config.gpu?.timing?.updateInterval || DEFAULT_CONFIG.gpu.timing.updateInterval));
