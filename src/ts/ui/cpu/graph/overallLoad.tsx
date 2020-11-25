import * as React from "react";
import {cpuUsage} from "../../../backend/cpu";
import {CpuUsageUpdate} from "../../../data/cpu";

interface StateType {
  percent: number;
}

export default class CpuUsageOverall extends React.Component<{}, StateType> {

  skip: number = 0

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      percent: 0
    };
  }

  render() {
    return (
      <text x="50%" y="50%" className={"cpu-overall"}>
        {(this.state.percent * 100).toFixed(2)}%
      </text>
    )
  }

  updateUsage = (update: CpuUsageUpdate) => {
    if (this.skip % 4 === 0) {
      this.setState({
        percent: update.overallUsage
      });
    }
    this.skip++;
  }

  componentDidMount() {
    cpuUsage.watch(this.updateUsage)
  }

  componentWillUnmount() {
    cpuUsage.remove(this.updateUsage);
  }
}
