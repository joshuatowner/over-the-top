import Two = require("two.js");
import {BACKGROUND_COLOR, CPU_PRIMARY, FEATURE_BACKGROUND_COLOR} from "../constants/styles";
import getArcSegment from "../shapes/getArcSegment";

export default class CoreLoad {

    two: Two;
    center: Point;
    innerRadius: number;
    outerRadius: number;
    padding: number;
    coreGraphics: Two.ArcSegment[];

    backgroundLayer: Two.Group;
    dataLayer: Two.Group;
    overlayLayer: Two.Group;

    lastLevels?: number[];
    newLevels?: number[];
    lastTime?: number;
    nextTime?: number;
    period: number;

    constructor(
        two: Two,
        center: Point,
        innerRadius: number,
        outerRadius: number,
        period: number,
        numCores: number,
        padding = 5,
    ) {
        this.two = two;
        this.center = center;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.padding = padding;
        this.period = period;
        this.coreGraphics = [];
        this.backgroundLayer = this.two.makeGroup([]);
        this.dataLayer = this.two.makeGroup([]);
        this.overlayLayer = this.two.makeGroup([]);
        this.init(numCores);
    }

    init(numCores: number): void {
        this.initBackground(numCores);
        this.initBars(numCores);
        this.initBorders(numCores);
        this.two.bind("update", () => this.drawUpdate()).play();
    }

    initBackground(numCores: number): void {
        for (let i = 0; i < numCores; i++) {
            const coreBackground = getArcSegment(this.two, this.innerRadius, this.outerRadius, this.center,
                numCores, i, {
                    noStroke: true,
                    fill: FEATURE_BACKGROUND_COLOR.hex(),
                });
            this.backgroundLayer.add(coreBackground);
        }
    }

    initBorders(numCores: number): void {
        for (let i = 0; i < numCores; i++) {
            const frame = getArcSegment(this.two, this.innerRadius, this.outerRadius, this.center,
                numCores, i, {
                    noFill: true,
                    linewidth: this.padding,
                    stroke: BACKGROUND_COLOR.hex()
                }
            );
            this.overlayLayer.add(frame);
        }
        const center = this.two.makeCircle(this.center.x, this.center.y, this.innerRadius);
        center.noStroke();
        center.fill = BACKGROUND_COLOR.hex();
        this.overlayLayer.add(center);
    }

    initBars(numCores: number): void {
        for (let i = 0; i < numCores; i++) {
            const bar = getArcSegment(this.two, 0, this.outerRadius, this.center,
                numCores, i, {
                    noStroke: true,
                    fill: CPU_PRIMARY.hex(),
                });
            this.dataLayer.add(bar);
        }
    }


    drawUpdate(): void {
        const curTime = Date.now() - this.period;
        if (!this.newLevels || !this.lastLevels) {
            return;
        }
        const numLevels = this.newLevels.length;
        const innerRadius = this.innerRadius + this.padding / 2;
        const outerRadius = this.outerRadius - this.padding;
        const innerOuterRatio = (innerRadius / outerRadius)
        for (let i = 0; i < numLevels; i++) {
            const level = this.getLevel(i, curTime);
            const segment: Two.ArcSegment = this.dataLayer.children[i] as Two.ArcSegment;
            segment.scale = innerOuterRatio + (1 - innerOuterRatio) * level;
        }
    }

    private getLevel(core: number, dateTime: number): number {
        if (!this.newLevels || !this.lastLevels || !this.nextTime || !this.lastTime) {
            return 0;
        }
        const percent = (dateTime - this.lastTime) / (this.nextTime - this.lastTime);
        const normPercent = Math.min(1, Math.max(0, percent));
        return normPercent * (this.newLevels[core] - this.lastLevels[core]) + this.lastLevels[core];
    }

    update(newLevels: number[]): void {
        this.lastLevels = this.newLevels;
        this.lastTime = this.nextTime;
        this.newLevels = newLevels;
        this.nextTime = Date.now();
    }

}
