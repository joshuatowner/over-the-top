import {Size} from "../../../util/vec2";
import * as React from "react";
import {numPointsX, numPointsY} from "../points";
import CpuUsageWidget from "../../cpu";
import {ProcessesInfoWidget} from "../../process";
import MemoryUsageWidget from "../../memory";
import {NetworkStatusWidget, NetworkUsageWidget} from "../../network";
import {GpuUsageWidget} from "../../gpu";

interface PropType {
  windowSize: Size;
}

export default class RowLayoutEngine extends React.Component<PropType, {}> {

  render() {
    const totalWidth = numPointsX(this.props.windowSize) - 1;
    const totalHeight = numPointsY(this.props.windowSize) - 1;
    const padding = 1;
    let cpuSize = totalHeight;
    const fullCpuSize = cpuSize + padding;

    const gpuEnabled = window.config.gpu?.enabled ?? false;
    let memoryHeight = gpuEnabled ? totalHeight - padding * 3 : totalHeight;

    let networkFlowWidth = 10;
    const networkFlowTotalWidth = networkFlowWidth + padding;

    const pingWidth = 6;
    const totalPingWidth = pingWidth + padding;

    const memoryWidth = totalWidth - fullCpuSize - networkFlowTotalWidth - totalPingWidth;

    return (
      <>
        <CpuUsageWidget
          topLeft={{x: 0, y: 0}}
          size={{width: cpuSize, height: cpuSize}}
          windowSize={this.props.windowSize}
        />
        {memoryWidth > 0 && <MemoryUsageWidget
            topLeft={{x: fullCpuSize, y: 0}}
            size={{width: memoryWidth, height: memoryHeight}}
            windowSize={this.props.windowSize}
        />}
        {gpuEnabled && <GpuUsageWidget
          topLeft={{x: fullCpuSize, y: totalHeight - padding * 2}}
          size={{width: memoryWidth, height: padding * 2}}
          windowSize={this.props.windowSize}
        />}
        <NetworkUsageWidget
            topLeft={{x: fullCpuSize + memoryWidth + padding, y: 0}}
            size={{width: networkFlowWidth, height: totalHeight - padding * 4}}
            windowSize={this.props.windowSize}
        />
        <NetworkStatusWidget
            topLeft={{x: fullCpuSize + memoryWidth + padding + networkFlowWidth + padding, y: 0}}
            size={{width: pingWidth, height: totalHeight - padding * 4}}
            windowSize={this.props.windowSize}
        />
        <ProcessesInfoWidget
            topLeft={{x: fullCpuSize + memoryWidth + padding, y: totalHeight - padding * 3}}
            size={{width: networkFlowWidth + pingWidth + padding, height: padding * 3}}
            windowSize={this.props.windowSize}
        />
        {/*{diskHeight > 0 && <PartitionWidget*/}
        {/*    topLeft={{x: 0, y: fullCpuSize + networkFlowHeight + padding}}*/}
        {/*    size={{width: networkFlowWidth + padding + pingWebWidth, height: diskHeight}}*/}
        {/*    windowSize={this.props.windowSize}*/}
        {/*/>}*/}
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
        {/*{detailsWidth !== 0 && <DetailsWidget*/}
        {/*  topLeft={{x: fullCpuWidth + fullProcessWidth + fullMemoryNetworkWidth, y: 0}}*/}
        {/*  size={{width: detailsWidth, height: totalHeight}}*/}
        {/*  windowSize={this.props.windowSize}*/}
        {/*/>}*/}
      </>
    );
  }
}
