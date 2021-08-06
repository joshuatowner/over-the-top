import React from "react";
import UsageGrid from "./grid";
import {Size} from "../../util/vec2";
import {memoryUsage} from "../../backend/memory";
import AppliedObservable from "../../data/observable/appliedObservable";
import {MemoryUsageUpdate} from "../../data/memory";

interface PropType {
  size: Size;
}

const getGridValues = (memUsage: MemoryUsageUpdate): Map<number, number> => {
  const map = new Map<number, number>();
  map.set(1, memUsage.memoryActiveUsage);
  map.set(0.5, memUsage.memoryCacheUsage);
  return map;
}

const memoryPercent = new AppliedObservable(memoryUsage, getGridValues);

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
