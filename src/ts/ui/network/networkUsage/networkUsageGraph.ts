import Two = require("two.js");
import BaseDottedLine from "../../common/linearHistoryBar/baseDottedLine";
import {
    NETWORK_BASE_LINE_COLOR, NETWORK_GUIDE_LINE_COLOR,
    NETWORK_PRIMARY
} from "../../constants/styles";
import Color = require("color");
import LinearHistoryBars from "../../common/linearHistoryBar/linearHistoryBars";
import LevelLabel from "../../common/linearHistoryBar/levelLabel";
import {ONE_BYTE, ONE_GIGABIT, ONE_GIGABYTE, ONE_KILOBIT, ONE_KILOBYTE} from "../../constants/data";

export default class NetworkUsageGraph {

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
    downGraph?: LinearHistoryBars;
    upGraph?: LinearHistoryBars;

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
            barColor = NETWORK_PRIMARY,
            baseLineColor = NETWORK_BASE_LINE_COLOR,
            guideLineColor = NETWORK_GUIDE_LINE_COLOR,
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
            y: this.topLeft.y + this.height / 2 - 0.5,
        }
        new BaseDottedLine(
            this.two, baseLineTopLeft, this.width, this.baseLineThickness,
            this.numSegments, this.padding, this.baseLineColor, {
                group: this.backgroundGroup,
            }
        );
        this.downGraph = new LinearHistoryBars(
            this.two, this.topLeft,
            this.width, this.getChartHeight(),
            this.period, this.barColor, this.numSegments, {
                padding: this.padding,
                group: this.dataGroup,
                gradient: false,
            }
        );
        this.upGraph = new LinearHistoryBars(
            this.two, {x: this.topLeft.x, y: this.topLeft.y + this.height - this.getChartHeight()},
            this.width, this.getChartHeight(),
            this.period, this.barColor, this.numSegments, {
                padding: this.padding,
                group: this.dataGroup,
                gradient: false,
                inverted: true,
            }
        );
        this.initLevelLabels();
    }

    initLevelLabels() {
        new LevelLabel(
            this.two, {x: this.topLeft.x, y: this.topLeft.y},
            this.width, 1, "125 MB/s", this.guideLineColor, {
                group: this.backgroundGroup,
            }
        );
        new LevelLabel(
            this.two, {x: this.topLeft.x, y: this.topLeft.y + Math.round(this.getChartHeight() / 2)},
            this.width, 1, "125 kB/s", this.guideLineColor, {
                group: this.backgroundGroup,
            }
        );
        new LevelLabel(
            this.two, {
                x: this.topLeft.x,
                y: Math.round(this.topLeft.y + this.height - this.getChartHeight() / 2) - 1
            },
            this.width, 1, "125 kB/s", this.guideLineColor, {
                group: this.backgroundGroup,
                inverted: true,
            }
        );
        new LevelLabel(
            this.two, {x: this.topLeft.x, y: this.topLeft.y + this.height - 1},
            this.width, 1, "125 MB/s", this.guideLineColor, {
                group: this.backgroundGroup,
                inverted: true,
            }
        );
    }

    async update(upSpeed: number, downSpeed: number) {
        this.upGraph?.update(this.normalize(upSpeed));
        this.downGraph?.update(this.normalize(downSpeed));
    }

    private getChartHeight() {
        return (this.height - 1) / 2 - 2;
    }

    normalize(bytes: number, min= ONE_KILOBIT, max= ONE_GIGABIT) {
        if (bytes <= 0) {
            return 0;
        }
        const denom = Math.log(max / min);
        const amount = (Math.log(bytes * ONE_BYTE) - Math.log(min)) / denom;
        return Math.max(Math.min(amount, 1), 0);
    }
}
