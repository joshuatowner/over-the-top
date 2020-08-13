import Two = require("two.js");
import Color = require("color");
import {DEFAULT_FONT_FAMILY} from "../../constants/styles";
import {getTextWidth} from "../../util/font";

const PADDING = 2;
const FONT_SIZE = 10;
const TEXT_HEIGHT = 14;


export default class LevelLabel {

    two: Two;
    group: Two.Group;

    topLeft: Point;
    width: number;
    height: number;
    color: Color;
    label: string;
    inverted: boolean;

    constructor(
        two: Two,
        topLeft: Point,
        width: number,
        height: number,
        label: string,
        color: Color, {
            group = two.makeGroup([]),
            inverted = false,
        }
    ) {
        this.two = two;
        this.width = width;
        this.height = height;
        this.topLeft = topLeft;
        this.color = color;
        this.label = label;
        this.group = group;
        this.inverted = inverted;
        this.init();
    }

    init(): void {
        const bar = this.two.makeRectangle(
            this.topLeft.x + this.width / 2, this.topLeft.y + this.height / 2, this.width, this.height
        );
        bar.fill = this.color.hex();
        bar.noStroke();
        this.group.add(bar);
        const textWidth = getTextWidth(this.label, `${FONT_SIZE}px`, DEFAULT_FONT_FAMILY);
        const textHeight = TEXT_HEIGHT;
        const textTopLeft = {
            x: this.topLeft.x + this.width - textWidth / 2 - PADDING,
            y: this.topLeft.y + (this.inverted ? -1 : 1) * (textHeight / 2 + PADDING) + (this.inverted ? 3 : 0),
        }
        const text = new Two.Text(
            this.label, textTopLeft.x, textTopLeft.y, {
                family: DEFAULT_FONT_FAMILY,
                leading: textHeight,
                size: `${FONT_SIZE}px`,
                weight: 700,
                fill: this.color.hex(),
            });
        this.group.add(text);
    }

}
