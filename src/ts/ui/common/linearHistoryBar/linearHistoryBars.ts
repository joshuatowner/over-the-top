import Two = require("two.js");
import {FEATURE_BACKGROUND_COLOR} from "../../constants/styles";
import {darkerLighterGradient, getColorForPercentage, GradientEntry} from "../../util/gradient";
import Color = require("color");
import {Group} from "two.js";

interface HistoryBar {
    rect: Two.Rectangle,
    start: number,
}

export default class LinearHistoryBars {

    two: Two;
    topLeft: Point;
    width: number;
    height: number;
    padding: number;

    period: number;
    numSegments: number;
    color: Color;
    colorGradient: GradientEntry[];

    beginFade: number;
    endFade: number;
    inverted: boolean;
    gradient: boolean;

    group: Two.Group;
    bars: HistoryBar[];
    curSegment = 0;

    constructor(
        two: Two,
        topLeft: Point,
        width: number,
        height: number,
        period: number,
        color: Color,
        numSegments: number, {
            padding = 1,
            beginFade = 0.5,
            endFade = 0.75,
            inverted = false,
            group = two.makeGroup(),
            gradient = true,
        }
    ) {
        this.two = two;
        this.topLeft = topLeft;
        this.width = width;
        this.height = height;
        this.period = period;
        this.padding = padding;
        this.color = color;
        this.colorGradient = darkerLighterGradient(color);
        this.numSegments = numSegments;
        this.beginFade = beginFade;
        this.endFade = endFade;
        this.inverted = inverted;
        this.group = group;
        this.gradient = gradient;
        this.bars = [];
        this.init();
    }

    init(): void {
        this.two.bind("update", () => this.drawTick()).play();
    }

    drawTick(): void {
        const now = Date.now();
        const beginFadeTime = now - this.period * this.numSegments * this.beginFade;
        const endFadeTime = now - this.period * this.numSegments * this.endFade;
        for (const bar of this.bars) {
            const startTime = bar.start;
            const rect = bar.rect;
            if (startTime > endFadeTime && startTime <= beginFadeTime) {
                rect.opacity = (endFadeTime - startTime) / (endFadeTime - beginFadeTime);
            }
            if (startTime <= endFadeTime) {
                this.group.remove(rect);
            }
        }

        this.bars = this.bars.filter(bar => bar.start > endFadeTime);
    }

    drawUpdate(amount: number): void {
        const rectWidth = this.width / this.numSegments - this.padding;
        const rectHeight = this.height * amount;
        const xIndent = rectWidth / 2 + (rectWidth + this.padding) * this.curSegment + this.padding / 2;
        const yIndent = this.inverted ? rectHeight / 2 : this.height - rectHeight / 2
        const newRect = this.two.makeRectangle(
            this.topLeft.x + xIndent, this.topLeft.y + yIndent,
            rectWidth, rectHeight
        );

        newRect.noStroke();
        newRect.fill = this.gradient ? getColorForPercentage(amount, this.colorGradient) : this.color.hex();

        this.bars.push({
            rect: newRect,
            start: Date.now()
        });
        this.group.add(newRect);
        this.curSegment = (this.curSegment + 1) % (this.numSegments);
    }

    update(amount: number) {
        this.drawUpdate(amount);
    }
}
