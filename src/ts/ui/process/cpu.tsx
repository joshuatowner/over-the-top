import * as React from "react";
import {AllProcessesInfo, ProcessInfo} from "../../data/process";
import ProcessBox from "./processBox";
import {processInfo} from "../../backend/process";

interface StateType {
  processes: ProcessInfo[];
}

export default class CpuProcesses extends React.Component<{}, StateType> {

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      processes: []
    }
  }

  updateCoreUsage = (update: AllProcessesInfo | undefined) => {
    this.setState({
      processes: update?.cpuProcs || []
    })
  }

  componentDidMount() {
    processInfo.watch(this.updateCoreUsage)
  }

  componentWillUnmount() {
    processInfo.remove(this.updateCoreUsage);
  }

  render() {
    return (
      <ProcessBox
        sortedProcesses={this.state.processes}
        title={"PROCESSES BY CPU"}
        displayValue={this.formatCpu}
        percentOfTotalValue={this.percentCpu}
      />
    );
  }

  formatCpu = (amount: number) => `${amount.toFixed(2)}%`;
  percentCpu = (amount: number) => Math.min(1, Math.max(0, (amount / 100)));
}