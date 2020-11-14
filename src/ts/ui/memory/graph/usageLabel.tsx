import * as React from "react";
import {memoryUsage} from "../../../backend/memory";
import {MemoryUsageUpdate} from "../../../data/memory";
import {formatBinaryBytes} from "../../util/data";
import {Size} from "../../../util/vec2";

interface StateType {
  usageBytes: number;
}

interface PropType {
  graphSize: Size;
}

export default class MemoryUsageGraphUsageLabel extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {usageBytes: 0};
  }

  updateUsage = (update: MemoryUsageUpdate) => {
    this.setState({usageBytes: update.memoryUsageBytes});
  }

  componentDidMount() {
    memoryUsage.watch(this.updateUsage);
  }

  componentWillUnmount() {
    memoryUsage.remove(this.updateUsage);
  }

  render() {
    return (<g>
      <text x={0} y={this.props.graphSize.height - 3} className={"memory-usage-usage-label"}>USAGE:</text>
      <text x={42} y={this.props.graphSize.height - 3} className={"memory-usage-usage-value"}>
        {formatBinaryBytes(this.state.usageBytes)}
      </text>
    </g>);
  }
}
