import React from "react";
import {MemoryUsageUpdate} from "../../data/memory";
import {memoryUsage} from "../observer/memory";
import {BackendContext} from "../backendContext";
import {formatBinaryBytes} from "../util/data";
import {GpuUsageUpdate} from "../../data/gpu";
import {gpuUsage} from "../observer/gpu";
import {ONE_BYTE} from "../constants/data";

interface StateType {
  maxVram?: number;
  currentVram?: number;
}

export class GpuGraphLabel extends React.Component<{}, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;


  update = (update: GpuUsageUpdate) => {
    this.setState({
      maxVram: update.vramCapacityBytes,
      currentVram: update.vramUsageBytes
    })
  }
  componentDidMount() {
    gpuUsage(this.context).watch(this.update);
  }

  componentWillUnmount() {
    gpuUsage(this.context).remove(this.update);
  }
  render() {
    if (!this.state || !this.state.maxVram || !this.state.currentVram) {
      return;
    }
    return <div className={"memory-info"}>
      <div className={"memory-title"}>GPU</div>
      <div style={{flexGrow: 1}} />
      <div>{formatBinaryBytes(this.state.currentVram / ONE_BYTE)} / {formatBinaryBytes(this.state.maxVram / ONE_BYTE)}</div>
    </div>
  }

}