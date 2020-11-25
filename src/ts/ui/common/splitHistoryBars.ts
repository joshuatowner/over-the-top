import Two = require("two.js");
import Color = require("color");
import {FEATURE_BACKGROUND_COLOR} from "../constants/styles";
import {darkerLighterGradient, getColorForPercentage, GradientEntry} from "../util/gradient";
import {Vec2} from "../../util/vec2";

interface SplitHistoryBar {
  rects: Two.Rectangle[],
  start: number,
}

export default class SplitHistoryBars {

  two: Two;
  topLeft: Vec2;
  width: number;
  height: number;

  period: number;
  numSegments: number;
  upperColorGradient: GradientEntry[];
  lowerColorGradient: GradientEntry[];

  beginFade: number;
  endFade: number;

  curSegment = 0;

  bars: SplitHistoryBar[];

  constructor(
    two: Two,
    topLeft: Vec2,
    width: number,
    height: number,
    period: number,
    upperColor: Color,
    lowerColor: Color,
    numSegments: number, {
      beginFade = 0.8,
      endFade = 1,
      speed = 1
    }
  ) {
    this.two = two;
    this.topLeft = topLeft;
    this.width = width;
    this.height = height;
    this.period = period / speed;
    this.numSegments = numSegments;
    this.upperColorGradient = darkerLighterGradient(upperColor);
    this.lowerColorGradient = darkerLighterGradient(lowerColor);
    this.beginFade = beginFade;
    this.endFade = endFade;
    this.bars = [];
    this.init();
  }

  init(): void {
    const background = this.two.makeRectangle(
      this.topLeft.x + this.width / 2,
      this.topLeft.y + this.height / 2,
      this.width, this.height
    );
    background.fill = FEATURE_BACKGROUND_COLOR.hex();
    background.noStroke();
    this.two.bind("update", () => this.drawTick()).play();
  }

  drawTick(): void {
    const now = Date.now();
    const beginFadeTime = now - this.period * this.numSegments * this.beginFade;
    const endFadeTime = now - this.period * this.numSegments * this.endFade;
    for (const bar of this.bars) {
      const startTime = bar.start;
      const rects = bar.rects;
      if (startTime > endFadeTime && startTime <= beginFadeTime) {
        rects.forEach(rect => rect.opacity = (endFadeTime - startTime) / (endFadeTime - beginFadeTime));
      }
      if (startTime <= endFadeTime) {
        rects.forEach(rect => rect.remove());
      }
    }

    this.bars = this.bars.filter(bar => bar.start > endFadeTime);
  }

  drawUpdate(upperAmount: number, lowerAmount: number): void {
    const rectWidth = this.width / this.numSegments;
    const upperHeight = this.height * upperAmount;
    const lowerHeight = this.height * lowerAmount;
    const xIndent = rectWidth / 2 + (this.width - rectWidth) * (this.curSegment / this.numSegments);
    const upperRect = this.two.makeRectangle(
      this.topLeft.x + xIndent,
      this.topLeft.y,
      rectWidth,
      upperHeight
    );
    const lowerRect = this.two.makeRectangle(
      this.topLeft.x + xIndent,
      this.topLeft.y + this.height - lowerHeight / 2,
      rectWidth,
      lowerHeight
    );

    upperRect.fill = getColorForPercentage(upperAmount, this.upperColorGradient);
    upperRect.stroke = FEATURE_BACKGROUND_COLOR.hex();
    lowerRect.fill = getColorForPercentage(lowerAmount, this.lowerColorGradient);
    lowerRect.stroke = FEATURE_BACKGROUND_COLOR.hex();

    this.bars.push({
      rects: [upperRect, lowerRect],
      start: Date.now()
    });
    this.curSegment = (this.curSegment + 1) % (this.numSegments + 1);
  }

  update(upperAmount: number, lowerAmount: number) {
    this.drawUpdate(upperAmount, lowerAmount);
  }
}
