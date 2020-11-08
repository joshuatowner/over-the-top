import * as React from "react";
import {AllProcessesInfo, ProcessInfo} from "../../data/process";
import ProcessBox from "./processBox";
import {processInfo} from "../../backend/process";
import {formatBinaryBytes} from "../util/data";
import {memoryInfo} from "../../backend/memory";

interface StateType {
  processes: ProcessInfo[];
  maxMemory: number;
}

export default class MemoryProcesses extends React.Component<{}, StateType> {

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      processes: [],
      maxMemory: 0
    }
    this.loadMemory();
  }

  async loadMemory() {
    const info = await memoryInfo();
    this.setState({
      maxMemory: info.memoryCapacity
    })
  }

  updateCoreUsage = (update: AllProcessesInfo | undefined) => {
    this.setState({
      processes: update?.memoryProcs || []
    })
  }

  componentDidMount() {
    processInfo.watch(this.updateCoreUsage)
  }

  componentWillUnmount() {
    processInfo.remove(this.updateCoreUsage);
  }

  render() {
    if (!this.state.maxMemory) {
      return;
    }
    return (
      <ProcessBox
        sortedProcesses={this.state.processes}
        title={"PROCESSES BY CPU"}
        displayValue={this.formatMem}
        percentOfTotalValue={this.percentMem}
      />
    );
  }

  formatMem = (amount: number) => formatBinaryBytes(amount, 0);
  percentMem = (amount: number) =>
    Math.min(1, Math.max(0, (amount / (this.state.maxMemory || amount))));
}