import * as React from "react";
import {memoryInfo} from "../../../backend/memory";
import {formatBinaryBytes} from "../../util/data";

interface StateType {
  capacityBytes: number;
}

export default class MemoryUsageGraphCapacityLabel extends React.Component<{}, StateType> {

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {capacityBytes: 0};
    this.loadValue();
  }

  async loadValue() {
    const info = await memoryInfo();
    this.setState({capacityBytes: info.memoryCapacity});
  }

  render() {
    return (<g>
      <text x={0} y={15} className={"memory-usage-capacity-label"}>CAPACITY:</text>
      <text x={80} y={15} className={"memory-usage-capacity-value"}>
        {formatBinaryBytes(this.state.capacityBytes)}
      </text>
    </g>);
  }
}
