import * as React from "react";
import {partitionInfo} from "../../backend/disk";
import {PartitionInfo} from "../../data/disk";
import PartitionRow from "./partitionRow";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";

interface StateType {
  partitions: PartitionInfo[]
}

const sortDisks = (disk1: PartitionInfo, disk2: PartitionInfo) => {
  const capacityCompare = (disk2.capacity || 0) - (disk1.capacity || 0);
  if (capacityCompare !== 0) {
    return capacityCompare;
  } else {
    return (disk2.usage || 0) - (disk1.usage || 0);
  }
}

export default class DiskRows extends React.Component<{}, StateType>{

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      partitions: []
    };
  }

  async componentDidMount() {
    await this.load();
  }

  async load() {
    let partitions = await partitionInfo();
    partitions = partitions
      .filter(partition => partition.fsType || partition.usage)
      .sort(sortDisks);
    this.setState({
      partitions
    });
  }

  render() {
    return <div className={"disk-list-container"}>
      <div className={"disk-entry disk-legend"}>
        <div className={"disk-list-usage"}>USAGE</div>
        <div className={"disk-list-name"}>NAME</div>
        <div className={"disk-list-value"}>CAPACITY</div>
        <div className={"disk-list-value"}>USAGE</div>
        <div className={"disk-list-value"}>FILESYSTEM</div>
      </div>
      <OverlayScrollbarsComponent
        className={"disk-list-container"}
        options={{
          scrollbars: {
            autoHide: 'leave',
            theme: 'os-theme-light',
          }
        }}
        defer
      >
        {this.state.partitions.map((partition, index) => <PartitionRow partition={partition} key={index} />)}
      </OverlayScrollbarsComponent>
    </div>
  }
}
