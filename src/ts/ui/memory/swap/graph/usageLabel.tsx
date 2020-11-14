import * as React from "react";
import MemoryUsageGraphUsageLabel from "../../graph/usageLabel";
import {MemoryUsageUpdate} from "../../../../data/memory";

export default class SwapUsageGraphUsageLabel extends MemoryUsageGraphUsageLabel {
  updateUsage = (update: MemoryUsageUpdate) => {
    this.setState({usageBytes: update.swapUsageBytes});
  }
}
