//import {sendProcessRequest} from "../../worker/boss";
import IntervalObservable from "../../data/intervalObservable";
import {getConfig} from "../../config";
import {getAllProcessInfo} from "./process";

//export const getAllProcessInfoWorker = sendProcessRequest;

export const processInfo = new IntervalObservable(
  () => getAllProcessInfo(getConfig().process.cpuNumber, getConfig().process.memNumber),
  getConfig().process.timing.updateInterval
)