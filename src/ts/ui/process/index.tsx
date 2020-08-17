import * as React from "react";
import {AllProcessesInfo} from "../../data/process";
import {getAllProcessInfoWorker} from "../../backend/process";
import {getConfig} from "../../config";
import ProcessBox from "./processBox";
import {formatBinaryBytes} from "../util/data";
import {CPU_PRIMARY, MEMORY_PRIMARY} from "../constants/styles";
import {memoryInfo} from "../../backend/memory";
import {setIntervalImmediate} from "../../util/timing";

interface State {
    processes: AllProcessesInfo
}

export default class ProcessesComponent extends React.Component<{}, State> {

    maxMemory?: number;

    constructor(props: Readonly<{}>) {
        super(props);
        this.state = {
            processes: {
                cpuProcs: [],
                memoryProcs: [],
            },
        }
        memoryInfo().then(info => {
            this.maxMemory = info.memoryCapacity
        });
    }

    componentDidMount() {
        setIntervalImmediate(() => this.update(), getConfig().process.timing.updateInterval);
    }

    render() {
        return (
            <div className={"flex-vert processContainer flex-grow"}>
                <ProcessBox
                    sortedProcesses={this.state.processes.cpuProcs}
                    title={"PROCESSES BY CPU"}
                    displayValue={this.formatCpu}
                    percentOfTotalValue={this.percentCpu}
                    color={CPU_PRIMARY}
                />
                <div className={"vspace20"} />
                <ProcessBox
                    sortedProcesses={this.state.processes.memoryProcs}
                    title={"PROCESSES BY MEMORY"}
                    displayValue={this.formatMem}
                    percentOfTotalValue={this.percentMem}
                    color={MEMORY_PRIMARY}
                />
            </div>
        );
    }

    async update() {
        const config = getConfig().process;
        const procs = await getAllProcessInfoWorker(config.cpuNumber, config.memNumber);
        if (procs) {
            this.setState({
                processes: procs,
            });
        }
    }

    formatCpu = (amount: number) => `${amount.toFixed(2)}%`;
    percentCpu = (amount: number) => Math.min(1, Math.max(0, (amount / 100)));

    formatMem = (amount: number) => formatBinaryBytes(amount, 0);
    percentMem = (amount: number) =>
        Math.min(1, Math.max(0, (amount / (this.maxMemory || amount))));
}

