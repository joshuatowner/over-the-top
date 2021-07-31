import {Size} from "../../../util/vec2";
import * as React from "react";
import {numPointsX, numPointsY} from "../points";
import CpuUsageWidget from "../../cpu";
import {CpuProcessesWidget, MemoryProcessesWidget} from "../../process";
import MemoryUsageWidget, {SwapUsageWidget} from "../../memory";
import {NetworkUsageWidget, PingWidget, WebRequestWidget} from "../../network";
import PartitionWidget from "../../disk";
import DetailsWidget from "../../details";

interface PropType {
  windowSize: Size;
}

export default class ResponsiveLayoutEngine extends React.Component<PropType, {}> {

  render() {
    const totalWidth = numPointsX(this.props.windowSize) - 1;
    const totalHeight = numPointsY(this.props.windowSize) - 1;
    const cpuWidth = 8;
    const fullCpuWidth = cpuWidth + 1;
    const memoryNetworkWidth = 11;
    const minProcessWidth = 6;
    const detailsWidth = totalWidth - (fullCpuWidth + memoryNetworkWidth + minProcessWidth) >= 6 ? 6 : 0;
    const fullMemoryNetworkWidth = memoryNetworkWidth + (detailsWidth === 0 ? 0 : 1);
    let fullProcessWidth = totalWidth - (fullCpuWidth + fullMemoryNetworkWidth + detailsWidth);
    let processWidth = fullProcessWidth - 1;
    if (processWidth < minProcessWidth) {
      fullProcessWidth = 0;
      processWidth = 0;
    }
    const memoryHeight = 4;
    let networkHeight = (totalHeight - memoryHeight >= 6) ? 6 : 0;
    const pingHeight = (totalHeight - (networkHeight + memoryHeight)) >= 4 ? 4 : 0;
    const swapHeight = (totalHeight - (memoryHeight + networkHeight + pingHeight)) >= 4 ? 4 : 0;
    networkHeight = networkHeight === 0 ? 0 : totalHeight - (pingHeight + swapHeight + memoryHeight);
    return (
      <>
        <CpuUsageWidget
          topLeft={{x: 0, y: 0}}
          size={{width: cpuWidth, height: 8}}
          windowSize={this.props.windowSize}
        />
        <NetworkUsageWidget
          topLeft={{x: 0, y: 8}}
          size={{width: 14, height: 6}}
          windowSize={this.props.windowSize}
        />
        {/*{processWidth !== 0 && (*/}
        {/*  <>*/}
        {/*    <CpuProcessesWidget*/}
        {/*      topLeft={{x: fullCpuWidth, y: 0}}*/}
        {/*      size={{width: processWidth, height: 4}}*/}
        {/*      windowSize={this.props.windowSize}*/}
        {/*    />*/}
        {/*    <MemoryProcessesWidget*/}
        {/*      topLeft={{x: fullCpuWidth, y: 4}}*/}
        {/*      size={{width: processWidth, height: 4}}*/}
        {/*      windowSize={this.props.windowSize}*/}
        {/*    />*/}
        {/*  </>*/}
        {/*)}*/}
        {/*<MemoryUsageWidget*/}
        {/*  topLeft={{x: fullCpuWidth + fullProcessWidth, y: 0}}*/}
        {/*  size={{width: memoryNetworkWidth, height: 4}}*/}
        {/*  windowSize={this.props.windowSize}*/}
        {/*/>*/}
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
        {/*{pingHeight !== 0 && <>*/}
        {/*    <PingWidget*/}
        {/*        topLeft={{x: fullCpuWidth + fullProcessWidth, y: memoryHeight + swapHeight + networkHeight}}*/}
        {/*        size={{width: 3, height: pingHeight}}*/}
        {/*        windowSize={this.props.windowSize}*/}
        {/*    />*/}
        {/*    <WebRequestWidget*/}
        {/*        topLeft={{x: fullCpuWidth + fullProcessWidth + 4, y: memoryHeight + swapHeight + networkHeight}}*/}
        {/*        size={{width: 3, height: pingHeight}}*/}
        {/*        windowSize={this.props.windowSize}*/}
        {/*    />*/}
        {/*</>}*/}
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
