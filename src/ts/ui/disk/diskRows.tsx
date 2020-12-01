import * as React from "react";
import {partitionInfo} from "../../backend/disk";
import {PartitionInfo} from "../../data/disk";
import PartitionRow from "./partitionRow";

interface StateType {
  partitions: PartitionInfo[]
}

export default class DiskRows extends React.Component<{}, StateType>{

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      partitions: []
    };
    this.load();
  }

  async load() {
    this.setState({
      partitions: await partitionInfo()
    });
  }

  render() {
    return <div className={"disk-rows-container"}>
      {this.state.partitions.map((partition, index) => <PartitionRow partition={partition} key={index} />)}
    </div>
  }
}
