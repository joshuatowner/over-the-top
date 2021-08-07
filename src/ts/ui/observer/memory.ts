import IntervalObservable from "../../data/observable/intervalObservable";
import {Backend} from "../../data/backend";
import {memoObservable} from "./memo";

export const memoryUsage = memoObservable((backend: Backend) =>
  new IntervalObservable(backend.memoryUsageUpdate, window.config.memory.timing.updateInterval));
