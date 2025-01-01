import * as React from "react";
import {formatBytes} from "../util/data";
import {PartitionInfo} from "../../data/disk";
import DiskMetric from "./metric";
import PartitionUsage from "./usage";
import PartitionUsageBar from "./usageBar";
import {ONE_BYTE, ONE_GIGABYTE} from "../constants/data";

interface PropType {
  partition: PartitionInfo;
}

export default class PartitionRow extends React.Component<PropType, {}>{
  render() {
    const {fsType, capacity, usage, usagePercent} = this.props.partition;
    return <div className={"disk-entry"}>
      <div className={"disk-list-usage"}>
        {usagePercent &&
            <PartitionUsageBar percentUsage={usagePercent} size={{width: 80, height: 80}} capacity={capacity || 0}/>}
      </div>
      <div className={"disk-list-name"}>{this.props.partition.label}</div>
      <div className={"disk-list-value"}>{capacity && formatBytes(capacity)}</div>
      <div className={"disk-list-value"}>{usage && formatBytes(usage)}</div>
      <div className={"disk-list-value"}>{fsType}</div>
    </div>
  }
}
