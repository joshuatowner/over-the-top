import Two = require("two.js");
import {CPU_LABEL} from "../constants/string"
import {DEFAULT_FONT_FAMILY} from "../constants/styles";

interface TimedArc {
    arc: Two.ArcSegment,
    start: number,
}

export default class OverallLoad {

    two: Two;
    center: Point;
    outerRadius: number;

    loadText?: Two.Text;

    constructor(
        two: Two,
        center: Point,
        outerRadius: number,
    ) {
        this.two = two;
        this.center = center;
        this.outerRadius = outerRadius;
        this.init();
    }

    private init(): void {
        // @ts-ignore (two does not have make text???)
        const cpuText = this.two.makeText(CPU_LABEL, this.center.x, this.center.y - this.outerRadius / 5, {});
        cpuText.size = 30;
        cpuText.fill = "#FFF";
        cpuText.weight = 300;
        cpuText.family = DEFAULT_FONT_FAMILY;

        // @ts-ignore (two does not have make text???)
        const loadText = this.two.makeText(this.getPercentage(0),
            this.center.x, this.center.y + this.outerRadius / 4, {});
        loadText.size = 20;
        loadText.fill = "#FFF";
        loadText.weight = 300;
        this.loadText = loadText;
        loadText.family = DEFAULT_FONT_FAMILY;
    }

    private drawUpdate(load: number): void {
        if (this.loadText) {
            this.loadText.value = this.getPercentage(load);
            this.two.update();
        }
    }

    update(load: number) {
        this.drawUpdate(load);
    }

    private getPercentage(load: number): string {
        return `${(load * 100).toFixed(2)}%`;
    }
}
