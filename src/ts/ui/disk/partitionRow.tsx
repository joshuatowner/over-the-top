import * as React from "react";
import {formatBytes} from "../util/data";
import {PartitionInfo} from "../../data/disk";
import DiskMetric from "./metric";
import PartitionUsage from "./usage";

interface PropType {
  partition: PartitionInfo;
}

export default class PartitionRow extends React.Component<PropType, {}>{
  render() {
    const {fsType, capacity, usage, usagePercent} = this.props.partition;
    return <>
      <div className={"partition-row-label background-secondary"}>{this.props.partition.label}</div>
      <div className={"partition-row-metrics-container"}>
        <DiskMetric label={"FILESYSTEM"} metric={fsType} />
        {capacity && <DiskMetric label={"CAPACITY"} metric={formatBytes(capacity)} />}
        {usage && <DiskMetric label={"USAGE"} metric={formatBytes(usage)} />}
      </div>
      <div>
        {usagePercent && <PartitionUsage percentUsage={usagePercent} />}
      </div>
    </>
  }
}
