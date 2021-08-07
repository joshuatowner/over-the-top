import * as React from "react";
import LinearGraphBackground from "../../common/linearGraph/background";
import LinearGraphBars from "../../common/linearGraph/bars";
import {MemoryUsageUpdate} from "../../../data/memory";
import LinearGraph from "../../common/linearGraph/graph";
import ValueLabel from "../../common/valueLabel";
import {formatBinaryBytes} from "../../util/data";
import {memoryUsage} from "../../observer/memory";
import IntervalObservable from "../../../data/observable/intervalObservable";
import {BackendContext} from "../../backendContext";

const getGraphValue = (update: MemoryUsageUpdate) => update.memoryActiveUsage;
const getCapacityValue = (update: MemoryUsageUpdate) => formatBinaryBytes(update.memCapacity);
const getUsageValue = (update: MemoryUsageUpdate) => formatBinaryBytes(update.memoryActiveUsageBytes);

export default class MemoryLinearUsageGraph extends LinearGraph {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  render() {
    const width = this.viewboxWidth();
    const height = this.viewboxHeight();
    const numBars = this.numBars();
    return (
      <div className={'memory-usage-graph-container'}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={'memory-usage-graph full'} preserveAspectRatio="xMidYMid meet">
          <ValueLabel
            label={"CAPACITY"} x={0} x2={80} y={15}
            observable={memoryUsage(this.context)} getValue={getCapacityValue}
          />
          <LinearGraphBackground
            numBars={numBars} dashWidth={this.dashWidth} dashSpace={this.dashSpace}
            topLeft={{x: 0, y: 24}}
            size={{height: height - 48, width: width}}
          />
          <LinearGraphBars
            numBars={numBars} dashWidth={this.dashWidth} dashSpace={this.dashSpace}
            topLeft={{x: 0, y: 24}}
            size={{height: height - 48 - this.dashSpace, width: width}}
            observable={memoryUsage(this.context) as IntervalObservable<MemoryUsageUpdate>} getValue={getGraphValue}
          />
          <ValueLabel
            label={"USAGE"} x={0} x2={60} y={height - 6}
            observable={memoryUsage(this.context)} getValue={getUsageValue}
          />
        </svg>
      </div>
    );
  }
}
