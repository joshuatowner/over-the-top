import * as React from "react";
import LinearGraphBackground from "../../common/linearGraph/background";
import LinearGraphBars from "../../common/linearGraph/bars";
import LinearGraph from "../../common/linearGraph/graph";
import ValueLabel from "../../common/valueLabel";
import {formatBytes, normalizeLog} from "../../util/data";
import {NetworkTransferUpdate} from "../../../data/network";
import {networkUsage} from "../../../backend/network";

const getDownGraphValue = (update: NetworkTransferUpdate) => normalizeLog(update.down);
const getUpGraphValue = (update: NetworkTransferUpdate) => normalizeLog(update.up);
const getDownLabelValue = (update: NetworkTransferUpdate) => `${formatBytes(update.down)}/s`;
const getUpLabelValue = (update: NetworkTransferUpdate) => `${formatBytes(update.up)}/s`;

export default class NetworkUsageGraph extends LinearGraph {

  render() {
    const width = this.viewboxWidth();
    const height = this.viewboxHeight();
    const numBars = this.numBars();
    return (
      <div className={'network-usage-lineargraph-container'}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className={'network-usage-graph full'} preserveAspectRatio="xMidYMid meet">
          <ValueLabel
            label={"DOWN"} x={0} x2={58} y={15}
            observable={networkUsage} getValue={getDownLabelValue}
          />
          <LinearGraphBackground
            numBars={numBars} dashWidth={this.dashWidth} dashSpace={this.dashSpace}
            topLeft={{x: 0, y: 24}}
            size={{height: (height - 48) / 2, width: width}}
            midLabel={"125 kB/s"} topLabel={"125 MB/s"}
          />
          <LinearGraphBackground
            numBars={numBars} dashWidth={this.dashWidth} dashSpace={this.dashSpace}
            topLeft={{x: 0, y: 24 + (height - 48) / 2}}
            size={{height: (height - 48) / 2, width: width}}
            inverted={true} midLabel={"125 kB/s"} topLabel={"125 MB/s"}
          />
          <LinearGraphBars
            numBars={numBars} dashWidth={this.dashWidth} dashSpace={this.dashSpace}
            topLeft={{x: 0, y: 24}}
            size={{height: (height - 48) / 2 - this.dashSpace, width: width}}
            observable={networkUsage} getValue={getDownGraphValue}
          />
          <LinearGraphBars
            numBars={numBars} dashWidth={this.dashWidth} dashSpace={this.dashSpace}
            topLeft={{x: 0, y: 24 + (height - 48) / 2 + this.dashSpace}}
            size={{height: (height - 48) / 2 - this.dashSpace, width: width}}
            observable={networkUsage} getValue={getUpGraphValue} inverted={true}
          />
          <ValueLabel
            label={"UP"} x={0} x2={34} y={height - 6}
            observable={networkUsage} getValue={getUpLabelValue}
          />
        </svg>
      </div>
    );
  }
}
