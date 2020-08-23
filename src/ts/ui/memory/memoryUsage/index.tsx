import * as React from "react";
import MemoryUsage from "./memoryUsage";
import Color = require("color");
import {memoryInfo, memoryUsageUpdate} from "../../../backend/memory";
import {getConfig} from "../../../config";
import {MEMORY_PRIMARY, SWAP_PRIMARY} from "../../constants/styles";
import {setIntervalImmediate} from "../../../util/timing";

const CAP_MEM_LABEL = "MEMORY CAPACITY";
const USG_MEM_LABEL = "MEMORY USAGE";
const CAP_SWP_LABEL = "SWAP CAPACITY";
const USG_SWP_LABEL = "SWAP USAGE";

export default class MemorySwapUsageComponent extends React.Component<{}, {}> {

    memElement: React.RefObject<HTMLDivElement>;
    swapElement: React.RefObject<HTMLDivElement>;

    memUi?: MemoryUsage;
    swapUi?: MemoryUsage;

    swapEnabled: false;

    constructor(props: Readonly<{}>) {
        super(props);
        this.memElement = React.createRef();
        this.swapElement = React.createRef();
    }

    componentDidMount() {
        this.bindComponent().then();
        this.startTimers();
    }

    async bindComponent() {
        const info = await memoryInfo();

        const swapEnabled = info.swapCapacity > 0;

        if (this.memElement.current) {
            if (swapEnabled) {
                this.memUi = new MemoryUsage(this.memElement.current, 496, 150,
                    CAP_MEM_LABEL, USG_MEM_LABEL, MEMORY_PRIMARY, info.memoryCapacity);
                this.swapUi = new MemoryUsage(this.memElement.current, 496, 150,
                    CAP_SWP_LABEL, USG_SWP_LABEL, SWAP_PRIMARY, info.swapCapacity);
            } else {
                this.memUi = new MemoryUsage(this.memElement.current, 496, 200,
                    CAP_MEM_LABEL, USG_MEM_LABEL, MEMORY_PRIMARY, info.memoryCapacity);
            }
        }
    }

    async update() {
        const update = await memoryUsageUpdate();
        this.memUi?.update(update.memoryUsage, update.memoryUsageBytes);
        this.swapUi?.update(update.swapUsage, update.swapUsageBytes);
    }

    startTimers() {
        setIntervalImmediate(() => this.update(), getConfig().memory.timing.updateInterval);
    }

    render() {
        return (
            <>
                <div className={"memoryGraph"} ref={this.memElement} />
                {this.swapEnabled && <div className={"vspace40"} />}
                <div className={"swapGraph"} ref={this.swapElement} />
            </>
        )
    }
}
