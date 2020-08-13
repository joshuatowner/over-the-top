import Two = require("two.js");
import BaseDottedLine from "../../common/linearHistoryBar/baseDottedLine";
import {MEMORY_BASE_LINE_COLOR, MEMORY_GUIDE_LINE_COLOR, MEMORY_PRIMARY} from "../../constants/styles";
import Color = require("color");
import LinearHistoryBars from "../../common/linearHistoryBar/linearHistoryBars";
import {memoryUsageUpdate} from "../../../backend/memory";
import LevelLabel from "../../common/linearHistoryBar/levelLabel";

export default class MemoryUsageGraph {

    topLeft: Point;
    width: number;
    height: number;
    padding: number;
    numSegments: number;
    baseLineThickness: number;
    period: number;

    two: Two;
    backgroundGroup: Two.Group;
    dataGroup: Two.Group;
    graph?: LinearHistoryBars;

    barColor: Color;
    baseLineColor: Color;
    guideLineColor: Color;

    constructor(
        two: Two,
        topLeft: Point,
        width: number,
        height: number,
        numSegments: number,
        padding: number,
        period: number, {
            backgroundGroup = two.makeGroup([]),
            dataGroup = two.makeGroup([]),
            barColor = MEMORY_PRIMARY,
            baseLineColor = MEMORY_BASE_LINE_COLOR,
            guideLineColor = MEMORY_GUIDE_LINE_COLOR,
            baseLineThickness = 1,
        }
    ) {
        this.two = two;
        this.topLeft = topLeft;
        this.width = width;
        this.height = height;
        this.numSegments = numSegments;
        this.padding = padding;
        this.baseLineThickness = baseLineThickness;
        this.period = period;

        this.backgroundGroup = backgroundGroup;
        this.dataGroup = dataGroup;

        this.barColor = barColor;
        this.baseLineColor = baseLineColor;
        this.guideLineColor = guideLineColor;

        this.init();
    }

    init() {
        const baseLineTopLeft = {
            x: this.topLeft.x,
            y: this.topLeft.y + this.height - this.baseLineThickness,
        }
        new BaseDottedLine(
            this.two, baseLineTopLeft, this.width, this.baseLineThickness,
            this.numSegments, this.padding, this.baseLineColor, {
                group: this.backgroundGroup,
            }
        );
        this.graph = new LinearHistoryBars(
            this.two, this.topLeft,
            this.width, this.getChartHeight(), // TODO CONST
            this.period, MEMORY_PRIMARY, this.numSegments, {
                padding: this.padding,
                group: this.dataGroup,
                gradient: false,
            }
        );
        this.initLevelLabels();
    }

    initLevelLabels() {
        new LevelLabel(
            this.two, {x: this.topLeft.x, y: Math.round(this.topLeft.y + this.getChartHeight() / 2)},
            this.width, 1, "50%", this.guideLineColor, {
                group: this.backgroundGroup,
            }
        );
        new LevelLabel(
            this.two, {x: this.topLeft.x, y: this.topLeft.y},
            this.width, 1, "100%", this.guideLineColor, {
                group: this.backgroundGroup,
            }
        );
    }

    async update(newLevel: number) {
        this.graph?.update(newLevel);
    }

    private getChartHeight() {
        return this.height - 2 - this.baseLineThickness;
    }
}
