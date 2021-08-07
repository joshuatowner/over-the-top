import React from "react";
import UsageGrid from "./grid";
import {Size} from "../../util/vec2";
import AppliedObservable from "../../data/observable/appliedObservable";
import {MemoryUsageUpdate} from "../../data/memory";
import {Backend} from "../../data/backend";
import {Observable} from "../../data/observable/observable";
import {memoryUsage} from "../observer/memory";
import {BackendContext} from "../backendContext";

interface PropType {
  size: Size;
}

const getGridValues = (memUsage: MemoryUsageUpdate): Map<number, number> => {
  const map = new Map<number, number>();
  map.set(1, memUsage.memoryActiveUsage);
  map.set(0.3, memUsage.memoryCacheUsage);
  return map;
}


export default class MemoryUsageGraph extends React.Component<PropType, {}> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  memoryPercent: Observable<Map<number, number>>;

  constructor(props: PropType, context: Backend) {
    super(props, context);
    this.memoryPercent = new AppliedObservable(memoryUsage(context), getGridValues);
  }

  render = () => {
    const { width, height } = this.props.size;

    return <svg
      viewBox={`0 0 ${width} ${height}`}
      className={'memory-usage-graph full'}
      preserveAspectRatio="xMidYMid meet"
    >
      <UsageGrid observable={this.memoryPercent} position={{x: 0, y: 0}} size={this.props.size} gridSize={8} />
    </svg>
  }

}
