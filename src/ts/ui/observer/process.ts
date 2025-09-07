import IntervalObservable from "../../data/observable/intervalObservable";
import {getConfig} from "../../backend/config";
import {memoObservable} from "./memo";

import {Backend} from "../../data/backend";

export const processInfo = memoObservable((backend: Backend) => new IntervalObservable(
  backend.processInfo,
  getConfig().process.timing.updateInterval
));

export const processDetailInfo = memoObservable((backend: Backend) => new IntervalObservable(
  backend.processInfo,
  getConfig().process.timing.processDetailUpdateInterval
));