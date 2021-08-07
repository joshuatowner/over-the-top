import * as React from "react";
import {MemoryUsageUpdate} from "../../../../data/memory";
import LinearGraphBackground from "../../../common/linearGraph/background";
import LinearGraphBars from "../../../common/linearGraph/bars";
import LinearGraph from "../../../common/linearGraph/graph";
import ValueLabel from "../../../common/valueLabel";
import {formatBinaryBytes} from "../../../util/data";
import {memoryUsage} from "../../../observer/memory";
import {BackendContext} from "../../../backendContext";

const getGraphValue = (update: MemoryUsageUpdate) => update.swapUsage;
const getCapacityValue = (update: MemoryUsageUpdate) => formatBinaryBytes(update.swapCapacity);
const getUsageValue = (update: MemoryUsageUpdate) => formatBinaryBytes(update.swapUsageBytes);

export default class MemoryUsageGraph extends LinearGraph {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  render() {
    const width = this.viewboxWidth();
    const height = this.viewboxHeight();
    const numBars = this.numBars();
    const memoryUsageObservable = memoryUsage(this.context);
    return (
      <div className={'swap-usage-graph-container'}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={'swap-usage-graph full'} preserveAspectRatio="xMidYMid meet">
          <ValueLabel
            label={"CAPACITY"} x={0} x2={80} y={15}
            observable={memoryUsageObservable} getValue={getCapacityValue}
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
            observable={memoryUsageObservable} getValue={getGraphValue}
          />
          <ValueLabel
            label={"USAGE"} x={0} x2={60} y={height - 6}
            observable={memoryUsageObservable} getValue={getUsageValue}
          />
        </svg>
      </div>
    );
  }
}
