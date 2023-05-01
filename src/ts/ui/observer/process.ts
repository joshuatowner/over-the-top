import IntervalObservable from "../../data/observable/intervalObservable";
import {getConfig} from "../../backend/config";
import {memoObservable} from "./memo";

export const processInfo = memoObservable((backend) => new IntervalObservable(
  backend.processInfo,
  getConfig().process.timing.updateInterval
));