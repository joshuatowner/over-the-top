import Two = require("two.js");
import Color = require("color");
import {DEFAULT_FONT_FAMILY} from "../constants/styles";
import {Vec2} from "../../util/vec2";

export default class DynamicText {

    two: Two;
    center: Vec2;
    fontSize: number;
    group: Two.Group;
    text: Two.Text;

    constructor(
        two: Two,
        center: Vec2,
        fontSize: number, {
            initialValue = "",
            group = two.makeGroup([]),
            color = Color("#FFFFFF"),
            family = DEFAULT_FONT_FAMILY,
        }
    ) {
        this.two = two;
        this.center = center;
        this.fontSize = fontSize;
        this.group = group;
        this.text = new Two.Text(initialValue, center.x, center.y);
        this.styleText(color, fontSize, family);
        this.group.add(this.text);
    }

    private styleText(color: Color, fontSize: number, family: string) {
        this.text.fill = color.hex();
        this.text.size = fontSize;
        this.text.family = family;
    }

    drawUpdate(value: string): void {
        this.text.value = value;
    }

    update(value: string) {
        this.drawUpdate(value);
    }
}
