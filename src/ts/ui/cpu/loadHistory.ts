import Two = require("two.js");
import getArcSegment from "../shapes/getArcSegment";
import {CPU_PRIMARY, FEATURE_BACKGROUND_COLOR} from "../constants/styles";
import {darkerLighterGradient, getColorForPercentage, GradientEntry, GREY_BLUE_GRADIENT} from "../util/gradient";

interface TimedArc {
    arc: Two.ArcSegment,
    start: number,
}

export default class LoadHistory {

    two: Two;
    center: Point;
    innerRadius: number;
    outerRadius: number;
    padding: number;

    period: number;
    numSegments: number;
    arcs: TimedArc[];

    curSegment: number;
    colorGradient: GradientEntry[];

    constructor(
        two: Two,
        center: Point,
        innerRadius: number,
        outerRadius: number,
        numSegments: number,
        period: number,
        padding = 5,
        color = CPU_PRIMARY,
    ) {
        this.two = two;
        this.center = center;
        this.innerRadius = innerRadius;
        this.outerRadius = outerRadius;
        this.padding = padding;
        this.period = period;
        this.numSegments = numSegments;
        this.arcs = [];
        this.curSegment = 0;
        this.colorGradient = darkerLighterGradient(color);
        this.init();
    }

    private init(): void {
        const background = this.two.makeArcSegment(
            this.center.x,
            this.center.y,
            this.innerRadius,
            this.outerRadius,
            0,
            Math.PI * 2,
            100
        );
        background.fill = FEATURE_BACKGROUND_COLOR.hex();
        background.noStroke();
        this.two.bind("update", () => this.drawFade()).play();
    }

    private drawFade(): void {
        const now = Date.now();
        const beginFadeTime = now - this.period * (0.75 * this.numSegments);
        const endFadeTime = now - this.period * (0.9 * this.numSegments);
        for (const timedArc of this.arcs) {
            const time = timedArc.start;
            if (time < beginFadeTime && time >= endFadeTime) {
                timedArc.arc.opacity = (endFadeTime - time) / (endFadeTime - beginFadeTime);
            } else if (time < endFadeTime) {
                timedArc.arc.remove();
            }
        }

        this.arcs = this.arcs.filter(arc => arc.start >= endFadeTime);
    }

    private drawUpdate(newLevel: number): void {
        this.curSegment = (this.curSegment + 1) % this.numSegments;
        this.arcs.push({
            arc: this.newSegment(newLevel, this.curSegment),
            start: new Date().getTime(),
        });
    }

    update(newLevel: number) {
        this.drawUpdate(newLevel);
    }

    private newSegment(level: number, position: number) {
        const outerRadius = (this.outerRadius - this.innerRadius) * level + this.innerRadius;
        return getArcSegment(
            this.two,
            this.innerRadius,
            outerRadius,
            this.center,
            this.numSegments,
            position, {
                fill: this.getColor(level),
                stroke: FEATURE_BACKGROUND_COLOR.hex(),
            }
        )
    }

    private getColor(level: number): string {
        return getColorForPercentage(level, this.colorGradient);
    }
}
