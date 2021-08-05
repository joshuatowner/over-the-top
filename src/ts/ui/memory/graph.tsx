import React from "react";
import UsageGrid from "./grid";
import {Size} from "../../util/vec2";
import {memoryUsage} from "../../backend/memory";
import AppliedObservable from "../../data/observable/appliedObservable";

interface PropType {
  size: Size;
}

const memoryPercent = new AppliedObservable(memoryUsage, memoryUsage => memoryUsage.memoryUsage);

export default class MemoryUsageGraph extends React.Component<PropType, {}> {

  render() {
    const { width, height } = this.props.size;

    return <svg
      viewBox={`0 0 ${width} ${height}`}
      className={'memory-usage-graph full'}
      preserveAspectRatio="xMidYMid meet"
    >
      <UsageGrid observable={memoryPercent} position={{x: 0, y: 0}} size={this.props.size} gridSize={8} />
    </svg>
  }

}
