import * as React from "react";
import CpuCoreUsageGraph from "./cores";
import CpuHistoryGraph from "./history";
import CpuUsageOverall from "./overallLoad";
import CpuSpeedGraph from "./speed";
import CpuTemperatureGraph from "./temperature";

const VIEWBOX_WIDTH = 300;
const VIEWBOX_HEIGHT = 300;

export default class CpuUsageGraph extends React.Component<{}, {}> {
  render() {
    const r = VIEWBOX_HEIGHT / 2 - 5;
    const cx = VIEWBOX_WIDTH / 2;
    const cy = VIEWBOX_HEIGHT / 2
    return (
      <svg viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`} className={'cpu-usage-graph'}>
        <CpuCoreUsageGraph
          position={{
            cx, cy,
            innerRadius: r * 0.4,
            outerRadius: r * 0.6
          }}
        />
        <CpuHistoryGraph
          position={{
            cx, cy,
            innerRadius: r * 0.8,
            outerRadius: r
          }}
        />
        <CpuSpeedGraph position={{
            cx, cy,
            innerRadius: r * 0.65,
            outerRadius: r * 0.75
          }}
        />
        <CpuTemperatureGraph position={{
            cx, cy,
            innerRadius: r * 0.4,
            outerRadius: r * 0.2
          }}
        />
        <CpuUsageOverall/>
      </svg>
    )
  }
}
