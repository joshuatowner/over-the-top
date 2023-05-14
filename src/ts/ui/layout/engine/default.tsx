import {Size} from "../../../util/vec2";
import * as React from "react";
import {numPointsX, numPointsY} from "../points";
import CpuUsageWidget from "../../cpu";
import {ProcessesInfoWidget} from "../../process";
import MemoryUsageWidget from "../../memory";
import {NetworkUsageWidget, PingWidget, WebRequestWidget} from "../../network";

interface PropType {
  windowSize: Size;
}

export default class ResponsiveLayoutEngine extends React.Component<PropType, {}> {

  render() {
    const totalWidth = numPointsX(this.props.windowSize) - 1;
    const totalHeight = numPointsY(this.props.windowSize) - 1;
    const padding = 1;
    const cpuSize = 8;
    const fullCpuSize = cpuSize + padding;
    const pingWebWidth = 6;
    const memoryWidth = totalWidth - (pingWebWidth + fullCpuSize + padding * 2);
    const networkFlowWidth = 14;
    const processesWidth = totalWidth - (networkFlowWidth + padding*2);
    let processesHeight = totalHeight - fullCpuSize;
    if (processesHeight < 3) {
      processesHeight = 0;
    }

    return (
      <>
        <CpuUsageWidget
          topLeft={{x: 0, y: 0}}
          size={{width: cpuSize, height: cpuSize}}
          windowSize={this.props.windowSize}
        />
        <MemoryUsageWidget
          topLeft={{x: fullCpuSize, y: 0}}
          size={{width: memoryWidth, height: cpuSize}}
          windowSize={this.props.windowSize}
        />
        <PingWidget
          topLeft={{x: fullCpuSize + memoryWidth + padding, y: 2}}
          size={{width: 3, height: 4}}
          windowSize={this.props.windowSize}
        />
        <WebRequestWidget
          topLeft={{x: cpuSize + memoryWidth + 5, y: 2}}
          size={{width: 3, height: 4}}
          windowSize={this.props.windowSize}
        />
        {processesHeight > 0 && processesWidth > 0 && <ProcessesInfoWidget
          topLeft={{x: 0, y: fullCpuSize}}
          size={{width: processesWidth, height: processesHeight}}
          windowSize={this.props.windowSize}
        />}
        {processesHeight > 0 && <NetworkUsageWidget
          topLeft={{x: processesWidth + padding*2, y: fullCpuSize}}
          size={{width: networkFlowWidth, height: processesHeight}}
          windowSize={this.props.windowSize}
        />}
        {/*{swapHeight !== 0 && <SwapUsageWidget*/}
        {/*    topLeft={{x: fullCpuWidth + fullProcessWidth, y: memoryHeight}}*/}
        {/*    size={{width: memoryNetworkWidth, height: swapHeight}}*/}
        {/*    windowSize={this.props.windowSize}*/}
        {/*/>}*/}
        {/*{networkHeight !== 0 && <NetworkUsageWidget*/}
        {/*    topLeft={{x: fullCpuWidth + fullProcessWidth, y: memoryHeight + swapHeight}}*/}
        {/*    size={{width: memoryNetworkWidth, height: networkHeight}}*/}
        {/*    windowSize={this.props.windowSize}*/}
        {/*/>}*/}
        {/*<PartitionWidget*/}
        {/*  topLeft={{x: 0, y: 9}}*/}
        {/*  size={{width: cpuWidth, height: totalHeight - 9}}*/}
        {/*  windowSize={this.props.windowSize}*/}
        {/*/>*/}
        {/*{detailsWidth !== 0 && <DetailsWidget*/}
        {/*  topLeft={{x: fullCpuWidth + fullProcessWidth + fullMemoryNetworkWidth, y: 0}}*/}
        {/*  size={{width: detailsWidth, height: totalHeight}}*/}
        {/*  windowSize={this.props.windowSize}*/}
        {/*/>}*/}
      </>
    );
  }
}
