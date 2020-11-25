import {Size} from "../../../util/vec2";
import * as React from "react";
import {numPointsX, numPointsY} from "../points";
import CpuUsageWidget from "../../cpu";
import {CpuProcessesWidget, MemoryProcessesWidget} from "../../process";
import MemoryUsageWidget, {SwapUsageWidget} from "../../memory";
import {NetworkUsageWidget, PingWidget, WebRequestWidget} from "../../network";

interface PropType {
  windowSize: Size;
}

export default class ResponsiveLayoutEngine extends React.Component<PropType, {}> {

  render() {
    const totalWidth = numPointsX(this.props.windowSize) - 1;
    const totalHeight = numPointsY(this.props.windowSize) - 1;
    const cpuWidth = 8;
    const fullCpuWidth = cpuWidth + 1;
    const memoryNetworkWidth = 10;
    let fullProcessWidth = totalWidth - (fullCpuWidth + memoryNetworkWidth);
    let processWidth = fullProcessWidth - 1;
    if (processWidth < 6) {
      fullProcessWidth = 0;
      processWidth = 0;
    }
    const memoryHeight = 4;
    const networkHeight = (totalHeight - memoryHeight >= 6) ? 6 : 0;
    const pingHeight = (totalHeight - (networkHeight + memoryHeight)) >= 4 ? 4 : 0;
    const swapHeight = (totalHeight - (memoryHeight + networkHeight + pingHeight)) >= 4 ? 4 : 0;
    return (
      <>
        <CpuUsageWidget
          topLeft={{x: 0, y: 0}}
          size={{width: cpuWidth, height: 8}}
          windowSize={this.props.windowSize}
        />
        {processWidth !== 0 && (
          <>
            <CpuProcessesWidget
              topLeft={{x: fullCpuWidth, y: 0}}
              size={{width: processWidth, height: 4}}
              windowSize={this.props.windowSize}
            />
            <MemoryProcessesWidget
              topLeft={{x: fullCpuWidth, y: 4}}
              size={{width: processWidth, height: 4}}
              windowSize={this.props.windowSize}
            />
          </>
        )}
        <MemoryUsageWidget
          topLeft={{x: fullCpuWidth + fullProcessWidth, y: 0}}
          size={{width: memoryNetworkWidth, height: 4}}
          windowSize={this.props.windowSize}
        />
        {swapHeight !== 0 && <SwapUsageWidget
            topLeft={{x: fullCpuWidth + fullProcessWidth, y: memoryHeight}}
            size={{width: memoryNetworkWidth, height: swapHeight}}
            windowSize={this.props.windowSize}
        />}
        {networkHeight !== 0 && <NetworkUsageWidget
            topLeft={{x: fullCpuWidth + fullProcessWidth, y: memoryHeight + swapHeight}}
            size={{width: memoryNetworkWidth, height: networkHeight}}
            windowSize={this.props.windowSize}
        />}
        {pingHeight !== 0 && <>
            <PingWidget
                topLeft={{x: fullCpuWidth + fullProcessWidth, y: memoryHeight + swapHeight + networkHeight}}
                size={{width: 3, height: pingHeight}}
                windowSize={this.props.windowSize}
            />
            <WebRequestWidget
                topLeft={{x: fullCpuWidth + fullProcessWidth + 4, y: memoryHeight + swapHeight + networkHeight}}
                size={{width: 3, height: pingHeight}}
                windowSize={this.props.windowSize}
            />
        </>}
      </>
    );
  }
}
