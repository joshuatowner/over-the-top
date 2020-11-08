import Two = require("two.js");
import Color = require("color");
import {getColorForPercentage} from "../../util/gradient";
import {Vec2} from "../../../util/vec2";

export default class BaseDottedLine {

    two: Two;
    group: Two.Group;

    topLeft: Vec2;
    width: number;
    height: number;
    numSegments: number;
    padding: number;
    color: Color;

    constructor(
        two: Two,
        topLeft: Vec2,
        width: number,
        height: number,
        numSegments: number,
        padding: number,
        color: Color, {
            group = two.makeGroup([])
        }
    ) {
        this.two = two;
        this.width = width;
        this.height = height;
        this.topLeft = topLeft;
        this.padding = padding;
        this.numSegments = numSegments;
        this.color = color;
        this.group = group;
        this.init();
    }

    init(): void {
        const rectWidth = this.width / this.numSegments - this.padding;
        const rectHeight = this.height;
        // TODO correct # of segments
        for (let i = 0; i <= this.numSegments; i++) {
            const xIndent = rectWidth / 2 + (rectWidth + this.padding) * i + this.padding / 2;
            const yIndent = rectHeight / 2;
            const newRect = this.two.makeRectangle(
                this.topLeft.x + xIndent, this.topLeft.y + yIndent,
                rectWidth, rectHeight
            );

            newRect.noStroke();
            newRect.fill = this.color.hex();
            this.group.add(newRect);
        }
    }

}
