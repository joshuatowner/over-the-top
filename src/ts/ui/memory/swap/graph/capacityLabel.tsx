import * as React from "react";
import MemoryUsageGraphCapacityLabel from "../../graph/capacityLabel";
import {memoryInfo} from "../../../../backend/memory";

export default class SwapUsageGraphCapacityLabel extends MemoryUsageGraphCapacityLabel {

  async loadValue() {
    const info = await memoryInfo();
    this.setState({capacityBytes: info.swapCapacity});
  }
}
