import Two from "two.js";
import Color from "color";
import {DEFAULT_FONT_FAMILY} from "../constants/styles";
import {Vec2} from "../../util/vec2";

export default class DynamicText {

  two: Two;
  center: Vec2;
  fontSize: number;
  group: any;
  text: any;

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
    // this.group.add(this.text);
  }

  private styleText(color: any, fontSize: number, family: string) {
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
