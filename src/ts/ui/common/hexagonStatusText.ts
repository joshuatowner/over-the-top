import Two = require("two.js");
import {BACKGROUND_COLOR, NETWORK_PRIMARY} from "../constants/styles";
import {HexagonStatus} from "./hexagonStatus";
import DynamicText from "./dynamicText";
import Color = require("color");
import {Vec2} from "../../util/vec2";

export default class HexagonStatusText extends HexagonStatus {

    text?: DynamicText;
    textColor: Color;

    percentTextSize: number;

    constructor(
        two: Two,
        center: Vec2,
        width: number,
        height: number, {
            percentInnerSize = 0.7,
            percentTextSize = 0.2,
            color = NETWORK_PRIMARY,
            backgroundColor = BACKGROUND_COLOR,
            textColor = Color("#FFFFFF"),
            period = 0,
            minOpacity = 0,
        }
    ) {
        super(two, center, width, height, { percentInnerSize, color, backgroundColor, period, minOpacity });
        this.textColor = textColor;
        this.percentTextSize = percentTextSize;
        this.initText();
    }

    initText() {

        const fontSize = this.radius() * 2 * this.percentTextSize;

        this.text = new DynamicText(this.two, this.center, fontSize, {
            color: this.textColor,
        })
    }

    update(value?: string) {
        super.update();
        if (value) {
            this.text?.update(value);
        }
    }

}
