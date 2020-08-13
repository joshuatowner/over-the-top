import Two = require("two.js");
import CoreLoad from "./coreLoad";
import LoadHistory from "./loadHistory";
import OverallLoad from "./overallLoad";
import {CpuInfo} from "../../data/cpu";
import {cpuInfo, cpuUsageUpdate} from "../../backend/cpu";
import {getConfig} from "../../config";

interface CpuComponentSizes {
    coresInnerRadius: number,
    coresOuterRadius: number,
    historyInnerRadius: number,
    historyOuterRadius: number,
}

export default class CpuUI {

    targetWidth: number;
    targetHeight: number;
    two: Two;
    cores?: CoreLoad;
    history?: LoadHistory;
    overallLoad?: OverallLoad;

    constructor(element: HTMLElement, width: number, height: number) {
        this.targetWidth = width;
        this.targetHeight = height;
        const params = {
            width: this.targetWidth,
            height: this.targetHeight
        };
        this.two = new Two(params).appendTo(element);
        this.startTimers();
        cpuInfo().then((info) => this.init(info));
    }

    private init(info: CpuInfo): void {
        const center = this.getCenter();
        const sizes = this.getSizes();
        const updateInterval = getConfig().cpu.timing.updateInterval;
        const historyNumSegements = getConfig().cpu.ui.sizing.historyNumSegments;
        this.cores = new CoreLoad(
            this.two, center,
            sizes.coresInnerRadius, sizes.coresOuterRadius,
            updateInterval, info.cores
        );
        this.history = new LoadHistory(
            this.two, center,
            sizes.historyInnerRadius, sizes.historyOuterRadius,
            historyNumSegements, updateInterval,
        );
        this.overallLoad = new OverallLoad(this.two, center, sizes.coresInnerRadius);
        this.two.update();
    }

    private startTimers(): void {
        setInterval(() => this.update(), getConfig().cpu.timing.updateInterval);
    }

    private async update(): Promise<void> {
        const load = await cpuUsageUpdate();
        this.cores?.update(load.coreUsages);
        this.history?.update(load.overallUsage);
        this.overallLoad?.update(load.overallUsage);
    }

    private getSizes(): CpuComponentSizes {
        const fullRadius = Math.min(this.targetWidth, this.targetHeight) / 2;
        const configSizes = getConfig().cpu.ui.sizing;
        return {
            coresInnerRadius: fullRadius * configSizes.coresStart,
            coresOuterRadius: fullRadius * configSizes.coresEnd,
            historyInnerRadius: fullRadius * configSizes.historyStart,
            historyOuterRadius: fullRadius * configSizes.historyEnd,
        }
    }

    private getCenter(): Point {
        return {
            x: this.targetWidth / 2,
            y: this.targetHeight / 2
        }
    }

}
