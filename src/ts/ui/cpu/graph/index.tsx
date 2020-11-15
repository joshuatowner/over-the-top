import * as React from "react";
import CpuCoreUsageGraph from "./cores";
import CpuHistoryGraph from "./history";
import CpuUsageOverall from "./overallLoad";

const VIEWBOX_WIDTH = 300;
const VIEWBOX_HEIGHT = 300;

export default class CpuUsageGraph extends React.Component<{}, {}>{
  render() {
    const r = VIEWBOX_HEIGHT / 2;
    const cx = VIEWBOX_WIDTH / 2;
    const cy = VIEWBOX_HEIGHT / 2
    return (
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className={'cpu-usage-graph'}>
        <CpuCoreUsageGraph
          position={{
            cx, cy,
            innerRadius: r * 0.25,
            outerRadius: r * 0.7
          }}
        />
        <CpuHistoryGraph
          position={{
            cx, cy,
            innerRadius: r * 0.8,
            outerRadius: r
          }}
        />
        <CpuUsageOverall />
      </svg>
    )
  }
}
