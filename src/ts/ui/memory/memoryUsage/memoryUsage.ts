import {DEFAULT_FONT_FAMILY, MEMORY_LABEL_COLOR, MEMORY_PRIMARY, NETWORK_LABEL_COLOR} from "../../constants/styles";
import MemoryUsageGraph from "./memoryUsageGraph";
import Two = require("two.js");
import {getConfig} from "../../../config";
import {getTextWidth} from "../../util/font";
import DynamicText from "../../common/dynamicText";
import {formatBinaryBytes} from "../../util/data";
import Color = require("color");

const LABEL_FONT_SIZE = 15;
const LABEL_HEIGHT = 28;

const EXAMPLE_VALUE = "100.00 GiB";

export default class MemoryUsage {

    two: Two;
    width: number;
    height: number;
    period: number;

    topLabel: string;
    bottomLabel: string;
    color: Color;

    usageLabel?: DynamicText;
    graph?: MemoryUsageGraph;
    labelGroup: Two.Group;

    constructor(
        element: HTMLElement,
        width: number,
        height: number,
        topLabel: string,
        bottomLabel: string,
        color: Color,
        capacityBytes: number,
    ) {
        this.two = new Two({width, height});
        this.two.appendTo(element);
        this.width =  width;
        this.height = height;
        this.period = getConfig().memory.timing.updateInterval;

        this.topLabel = topLabel;
        this.bottomLabel = bottomLabel;
        this.color = color;

        this.labelGroup = this.two.makeGroup([]);

        this.init(capacityBytes);
    }

    init(capacityBytes: number) {
        const settings = getConfig().memory;
        this.initLabels(capacityBytes);
        this.graph = new MemoryUsageGraph(
            this.two, {x: 0, y: LABEL_HEIGHT}, this.width, this.height - LABEL_HEIGHT * 2,
            settings.ui.sizing.numSegments, settings.ui.sizing.barPadding, settings.timing.updateInterval, {}
        );
    }

    private initLabels(capacityBytes: number) {
        const settings = getConfig().memory;
        const capacityLabelWidth = getTextWidth(this.topLabel, `${LABEL_FONT_SIZE}px`, DEFAULT_FONT_FAMILY);
        const usageLabelWidth = getTextWidth(this.bottomLabel, `${LABEL_FONT_SIZE}px`, DEFAULT_FONT_FAMILY);
        const valueWidth = getTextWidth(EXAMPLE_VALUE, `${LABEL_FONT_SIZE}px`, DEFAULT_FONT_FAMILY);
        const capacityLabel = new Two.Text(this.topLabel, capacityLabelWidth / 2, LABEL_HEIGHT / 2 + 3, {
            fill: MEMORY_LABEL_COLOR,
            size: `${LABEL_FONT_SIZE}px`,
            family: DEFAULT_FONT_FAMILY,
            weight: 700,
        });
        const usageLabel = new Two.Text(this.bottomLabel, usageLabelWidth / 2, this.height - LABEL_HEIGHT / 2, {
            fill: MEMORY_LABEL_COLOR,
            size: `${LABEL_FONT_SIZE}px`,
            family: DEFAULT_FONT_FAMILY,
            weight: 700,
        });
        const capacityValueLabel = new Two.Text(formatBinaryBytes(capacityBytes, 2),
            capacityLabelWidth + valueWidth / 2, LABEL_HEIGHT / 2 + 3, {
            fill: MEMORY_LABEL_COLOR,
            size: `${LABEL_FONT_SIZE}px`,
            family: DEFAULT_FONT_FAMILY,
        });
        this.usageLabel = new DynamicText(this.two, {
            x: usageLabelWidth + 5 + valueWidth / 2,
            y: this.height - LABEL_HEIGHT / 2
        }, LABEL_FONT_SIZE, {
            family: DEFAULT_FONT_FAMILY,
            color: MEMORY_LABEL_COLOR
        });
        this.two.scene.add(capacityLabel, usageLabel, capacityValueLabel);
    }

    update(usagePercent: number, usageBytes: number) {
        this.graph?.update(usagePercent);
        this.usageLabel?.update(formatBinaryBytes(usageBytes, 2));
    }

}
