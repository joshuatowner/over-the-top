import {Size} from "../../../util/vec2";
import * as React from "react";
import {numPointsX, numPointsY} from "../points";
import CpuUsageWidget from "../../cpu";
import {ProcessesInfoWidget} from "../../process";
import MemoryUsageWidget from "../../memory";
import {NetworkStatusWidget, NetworkUsageWidget, PingWidget, WebRequestWidget} from "../../network";
import PartitionWidget from "../../disk";
import UsageBlobsWidget from "../../disk/usageblob/usageBlobsWidget"; // Import the new widget
import RowLayoutEngine from "./row";

interface PropType {
  windowSize: Size;
}

export default class ResponsiveLayoutEngine extends React.Component<PropType, {}> {

  render() {
    const totalWidth = numPointsX(this.props.windowSize) - 1;
    const totalHeight = numPointsY(this.props.windowSize) - 1;

    if (totalWidth > totalHeight * 3) {
      return <RowLayoutEngine windowSize={this.props.windowSize} />
    }
    const padding = 1;
    let cpuSize = Math.min(6, totalHeight, totalWidth);
    if (cpuSize / totalHeight < 0.3) {
      cpuSize = Math.ceil(totalHeight * 0.3);
    }
    const fullCpuSize = cpuSize + padding;

    const memoryWidth = totalWidth - fullCpuSize;

    let networkFlowWidth = Math.min(totalWidth, 14);
    let networkFlowHeight = Math.min(totalHeight - fullCpuSize, 6);
    if (networkFlowWidth < 14 || networkFlowHeight < 6) {
      networkFlowWidth = 0;
      networkFlowHeight = 0;
    }
    const networkFlowTotalWidth = (networkFlowWidth > 0 ? padding + networkFlowWidth : 0)

    let pingWebWidth = Math.min(totalWidth - padding - networkFlowWidth, 6);
    if (pingWebWidth < 6 || networkFlowHeight <= 0) {
      pingWebWidth = 0;
    }
    const pingWebWidthTotalWidth = (pingWebWidth > 0 ? padding + pingWebWidth : 0)

    const processesWidth = totalWidth - (networkFlowTotalWidth + pingWebWidthTotalWidth);
    let processesHeight = totalHeight - fullCpuSize;
    if (processesHeight < 3 || processesWidth < 3) {
      processesHeight = 0;
    }
    let diskHeight = totalHeight - (fullCpuSize + networkFlowHeight + padding);

    return (
      <>
        <CpuUsageWidget
          topLeft={{x: 0, y: 0}}
          size={{width: cpuSize, height: cpuSize}}
          windowSize={this.props.windowSize}
        />
        {memoryWidth > 0 && <MemoryUsageWidget
          topLeft={{x: fullCpuSize, y: 0}}
          size={{width: memoryWidth, height: cpuSize}}
          windowSize={this.props.windowSize}
        />}
        {networkFlowHeight > 0 && networkFlowWidth > 0 && <NetworkUsageWidget
            topLeft={{x: 0, y: fullCpuSize}}
            size={{width: networkFlowWidth, height: networkFlowHeight}}
            windowSize={this.props.windowSize}
        />}
        {pingWebWidth > 0 && networkFlowHeight > 0 && <NetworkStatusWidget
          topLeft={{x: networkFlowWidth + padding, y: fullCpuSize + padding}}
          size={{width: pingWebWidth, height: networkFlowHeight - padding * 2}}
          windowSize={this.props.windowSize}
        />}
        {processesHeight > 0 && processesWidth > 0 && <ProcessesInfoWidget
          topLeft={{x: networkFlowTotalWidth + pingWebWidthTotalWidth, y: fullCpuSize}}
          size={{width: processesWidth, height: processesHeight}}
          windowSize={this.props.windowSize}
        />}
        {/* Commented out existing PartitionWidget for now */}
        {/* {diskHeight > 0 && <PartitionWidget
          topLeft={{x: 0, y: fullCpuSize + networkFlowHeight + padding}}
          size={{width: networkFlowWidth + padding + pingWebWidth, height: diskHeight}}
          windowSize={this.props.windowSize}
        />}*/}
        {diskHeight > 0 && <UsageBlobsWidget // Use the new UsageBlobs widget
          topLeft={{x: 0, y: fullCpuSize + networkFlowHeight + padding}}
          size={{width: networkFlowWidth + pingWebWidth + padding, height: diskHeight}} // Make it square
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
        {/*{detailsWidth !== 0 && <DetailsWidget*/}
        {/*  topLeft={{x: fullCpuWidth + fullProcessWidth + fullMemoryNetworkWidth, y: 0}}*/}
        {/*  size={{width: detailsWidth, height: totalHeight}}*/}
        {/*  windowSize={this.props.windowSize}*/}
        {/*/>}*/}
      </>
    );
  }
}
