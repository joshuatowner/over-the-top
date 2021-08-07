import * as React from "react";
import {CpuUsageUpdate} from "../../../data/cpu";
import {cpuUsage} from "../../observer/cpu";
import {BackendContext} from "../../backendContext";

interface StateType {
  percent: number;
}

export default class CpuUsageOverall extends React.Component<{}, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

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
        {(this.state.percent * 100).toFixed(0)}
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
    cpuUsage(this.context).watch(this.updateUsage)
  }

  componentWillUnmount() {
    cpuUsage(this.context).remove(this.updateUsage);
  }
}
