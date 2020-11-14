import * as React from "react";
import MemoryUsageGraphCapacityLabel from "./capacityLabel";
import MemoryUsageGraphUsageLabel from "./usageLabel";
import LinearGraphBackground from "../../common/linearGraph/background";
import LinearGraphBars from "../../common/linearGraph/bars";
import {MemoryUsageUpdate} from "../../../data/memory";
import {memoryUsage} from "../../../backend/memory";
import {Size} from "../../../util/vec2";

const DASH_WIDTH = 12;
const DASH_SPACE = 4;

const getGraphValue = (update: MemoryUsageUpdate) => update.memoryUsage;

interface PropType {
  size: Size;
}

export default class MemoryUsageGraph extends React.Component<PropType, {}>{

  viewboxHeight(): number {
    return this.props.size.height;
  }

  viewboxWidth(): number {
    return this.props.size.width - (this.props.size.width % (DASH_WIDTH + DASH_SPACE)) + DASH_WIDTH;
  }

  numBars(): number {
    return Math.ceil(this.viewboxWidth() / (DASH_SPACE + DASH_WIDTH));
  }

  render() {
    const width = this.viewboxWidth();
    const height = this.viewboxHeight();
    const numBars = this.numBars();
    return (
      <div className={'memory-usage-graph-container'}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={'memory-usage-graph full'} preserveAspectRatio="xMidYMid meet">
          <MemoryUsageGraphCapacityLabel />
          <LinearGraphBackground
            numBars={numBars} dashWidth={DASH_WIDTH} dashSpace={DASH_SPACE}
            topLeft={{x: 0, y: 24}}
            size={{height: height - 48, width: width}}
          />
          <LinearGraphBars
            numBars={numBars} dashWidth={DASH_WIDTH} dashSpace={DASH_SPACE}
            topLeft={{x: 0, y: 24}}
            size={{height: height - 48 - DASH_SPACE, width: width}}
            observable={memoryUsage} getValue={getGraphValue}
          />
          <MemoryUsageGraphUsageLabel
            graphSize={{height: height, width: width}}
          />
        </svg>
      </div>
    );
  }
}
