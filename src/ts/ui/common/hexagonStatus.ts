import Two = require("two.js");
import Color = require("color");
import {BACKGROUND_COLOR, NETWORK_PRIMARY} from "../constants/styles";

export class HexagonStatus {

    two: Two;
    center: Point;
    width: number;
    height: number;
    percentInnerSize: number;

    color: Color;
    backgroundColor: Color;
    lastUpdate?: number;
    period: number;

    hexOutline?: Two.Polygon;

    constructor(
        two: Two,
        center: Point,
        width: number,
        height: number, {
            percentInnerSize = .7,
            color = NETWORK_PRIMARY,
            backgroundColor = BACKGROUND_COLOR,
            period = 0,
            minOpacity = 0,
        }
    ) {
        this.two = two;
        this.center = center;
        this.width = width;
        this.height = height;
        this.percentInnerSize = percentInnerSize;

        this.period = period / (1 - minOpacity);
        this.color = color;
        this.backgroundColor = backgroundColor;

        this.lastUpdate = this.period === 0 ? undefined : Date.now();

        this.init();
        this.two.bind('update', () => this.tick()).play();
    }

    init() {
        const radius = this.radius();
        this.hexOutline = this.two.makePolygon(
            this.center.x, this.center.y, radius, 6
        );
        this.hexOutline.noStroke();
        this.hexOutline.fill = this.color.hex();
        this.hexOutline.rotation = Math.PI / 2;
        const inner = this.two.makePolygon(
            this.center.x, this.center.y, radius * this.percentInnerSize, 6
        );
        inner.noStroke();
        inner.fill = this.backgroundColor.hex();
        inner.rotation = Math.PI / 2;
        this.two.update();
    }

    tick() {
        if (!this.hexOutline) {
            return;
        }

        if (!this.lastUpdate || this.period <= 0) {
            this.hexOutline.opacity = 1;
        } else {
            const now = Date.now();
            this.hexOutline.opacity = Math.max(1 - (now - this.lastUpdate) / this.period, 0);
        }
    }

    update(): void {
        this.lastUpdate = Date.now();
    }

    protected radius(): number {
        return Math.min(this.width, this.height) / 2;
    }


}
