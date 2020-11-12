import * as React from "react";
import MemoryUsageGraphBackground from "./background";
import MemoryUsageGraphBars from "./bars";

const VIEWBOX_WIDTH = 300;
const VIEWBOX_HEIGHT = 150;
const DASH_WIDTH = 9;
const DASH_SPACE = 3;
const NUM_BARS = 23;

export default class MemoryUsageGraph extends React.Component<{}, {}>{
  render() {
    return (
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className={'memory-usage-graph'}>
        <MemoryUsageGraphBars
          numBars={NUM_BARS} dashWidth={DASH_WIDTH} dashSpace={DASH_SPACE}
          topLeft={{x: 0, y: 15}}
          size={{height: VIEWBOX_HEIGHT - 18, width: VIEWBOX_WIDTH}}
        />
        <MemoryUsageGraphBackground
          numBars={NUM_BARS} dashWidth={DASH_WIDTH} dashSpace={DASH_SPACE}
          topLeft={{x: 0, y: 15}}
          size={{height: VIEWBOX_HEIGHT - 15, width: VIEWBOX_WIDTH}}
        />
      </svg>
    );
  }
}
