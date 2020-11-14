import * as React from "react";
import MemoryUsageGraphCapacityLabel from "./capacityLabel";
import MemoryUsageGraphUsageLabel from "./usageLabel";
import LinearGraphBackground from "../../common/linearGraph/background";
import LinearGraphBars from "../../common/linearGraph/bars";
import {MemoryUsageUpdate} from "../../../data/memory";
import {memoryUsage} from "../../../backend/memory";

const VIEWBOX_WIDTH = 300 - 3;
const VIEWBOX_HEIGHT = 150;
const DASH_WIDTH = 9;
const DASH_SPACE = 3;
const NUM_BARS = 25;

const getGraphValue = (update: MemoryUsageUpdate) => update.memoryUsage;

export default class MemoryUsageGraph extends React.Component<{}, {}>{
  render() {
    return (
      <div className={'memory-usage-graph-container'}>
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          className={'memory-usage-graph full'} preserveAspectRatio="xMidYMid meet">
          <MemoryUsageGraphCapacityLabel />
          <LinearGraphBackground
            numBars={NUM_BARS} dashWidth={DASH_WIDTH} dashSpace={DASH_SPACE}
            topLeft={{x: 0, y: 15}}
            size={{height: VIEWBOX_HEIGHT - 30, width: VIEWBOX_WIDTH}}
          />
          <LinearGraphBars
            numBars={NUM_BARS} dashWidth={DASH_WIDTH} dashSpace={DASH_SPACE}
            topLeft={{x: 0, y: 15}}
            size={{height: VIEWBOX_HEIGHT - 30 - DASH_SPACE, width: VIEWBOX_WIDTH}}
            observable={memoryUsage} getValue={getGraphValue}
          />
          <MemoryUsageGraphUsageLabel
            graphSize={{height: VIEWBOX_HEIGHT, width: VIEWBOX_WIDTH}}
          />
        </svg>
      </div>
    );
  }
}
