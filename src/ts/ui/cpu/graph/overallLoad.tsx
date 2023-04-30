import * as React from "react";
import {CpuUsageUpdate} from "../../../data/cpu";
import {cpuUsage} from "../../observer/cpu";
import {BackendContext} from "../../backendContext";
import {Vec2} from "../../../util/vec2";

interface StateType {
  percent: number;
}


interface PropType {
  position: Vec2;
}

export default class CpuUsageOverall extends React.Component<PropType, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  skip: number = 0

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      percent: 0
    };
  }

  render() {
    const { x, y } = this.props.position;
    return <>
      <text x={x} y={y - 5} className={"cpu-overall"}>
        {(this.state.percent * 100).toFixed(0)}
      </text>
      <text x={x} y={y + 20} className={"cpu-title"}>
        CPU
      </text>
    </>
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
