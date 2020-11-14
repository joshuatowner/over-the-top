import {DEFAULT_FONT_FAMILY, MEMORY_LABEL_COLOR, MEMORY_PRIMARY, NETWORK_LABEL_COLOR} from "../../constants/styles";
import NetworkUsageGraph from "./networkUsageGraph";
import {MemoryInfo} from "../../../data/memory";
import {memoryInfo, memoryUsageUpdate} from "../../../backend/memory";
import Two = require("two.js");
import {getConfig} from "../../../config";
import {getTextWidth} from "../../util/font";
import {networkTransferUpdate} from "../../../backend/network";
import DynamicText from "../../common/dynamicText";
import {formatBytes} from "../../util/data";
import {setIntervalImmediate} from "../../../util/timing";

const LABEL_FONT_SIZE = 15;
const LABEL_HEIGHT = 28;

const DOWN_STRING = "DOWN";
const UP_STRING = "UP";
const EXAMPLE_VALUE = "100 GB/s";

export default class NetworkUsage {

    two: Two;
    width: number;
    height: number;
    period: number;

    graph?: NetworkUsageGraph;
    downSpeedLabel?: DynamicText;
    upSpeedLabel?: DynamicText;
    labelGroup: Two.Group;

    constructor(
        element: HTMLElement,
        width: number,
        height: number,
    ) {
        this.two = new Two({width, height});
        this.two.appendTo(element);
        this.width =  width;
        this.height = height;
        this.period = getConfig().memory.timing.updateInterval;

        this.labelGroup = this.two.makeGroup([]);

        this.startTimers();
        memoryInfo().then(info => this.init());
    }

    init() {
        const settings = getConfig().memory;
        this.initLabels();
        this.graph = new NetworkUsageGraph(
            this.two, {x: 0, y: LABEL_HEIGHT}, this.width, this.height - LABEL_HEIGHT * 2,
            settings.ui.sizing.numSegments, settings.ui.sizing.barPadding, settings.timing.updateInterval, {}
        );
    }

    private initLabels() {
        const settings = getConfig().memory;
        const upLabelWidth = getTextWidth(DOWN_STRING, `${LABEL_FONT_SIZE}px`, DEFAULT_FONT_FAMILY);
        const downLabelWidth = getTextWidth(UP_STRING, `${LABEL_FONT_SIZE}px`, DEFAULT_FONT_FAMILY);
        const valueWidth = getTextWidth(EXAMPLE_VALUE, `${LABEL_FONT_SIZE}px`, DEFAULT_FONT_FAMILY);
        const upLabel = new Two.Text(DOWN_STRING, upLabelWidth / 2, LABEL_HEIGHT / 2 + 3, {
            fill: NETWORK_LABEL_COLOR,
            size: `${LABEL_FONT_SIZE}px`,
            family: DEFAULT_FONT_FAMILY,
            weight: 700,
        });
        const downLabel = new Two.Text(UP_STRING, downLabelWidth / 2, this.height - LABEL_HEIGHT / 2, {
            fill: NETWORK_LABEL_COLOR,
            size: `${LABEL_FONT_SIZE}px`,
            family: DEFAULT_FONT_FAMILY,
            weight: 700,
        });
        this.downSpeedLabel = new DynamicText(this.two, {
            x: upLabelWidth + 5 + valueWidth / 2,
            y: LABEL_HEIGHT / 2 + 3
        }, LABEL_FONT_SIZE, {
            family: DEFAULT_FONT_FAMILY,
            color: NETWORK_LABEL_COLOR
        });
        this.upSpeedLabel = new DynamicText(this.two, {
            x: downLabelWidth + 5 + valueWidth / 2,
            y: this.height - LABEL_HEIGHT / 2
        }, LABEL_FONT_SIZE, {
            family: DEFAULT_FONT_FAMILY,
            color: NETWORK_LABEL_COLOR
        });
        this.two.scene.add(upLabel, downLabel);
    }

    private async update() {
        const netUpdate = await networkTransferUpdate();
        this.graph?.update(netUpdate.up, netUpdate.down);
        this.upSpeedLabel?.update(`${formatBytes(netUpdate.up)}/s`);
        this.downSpeedLabel?.update(`${formatBytes(netUpdate.down)}/s`);
    }

    private startTimers() {
        setIntervalImmediate(() => this.update(), this.period);
    }

}
