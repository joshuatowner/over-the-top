import React from "react";
import {MemoryUsageUpdate} from "../../data/memory";
import {memoryUsage} from "../observer/memory";
import {BackendContext} from "../backendContext";
import {formatBinaryBytes} from "../util/data";

interface StateType {
  maxMemory?: number;
  currentMemory?: number;
}

export class MemoryGraphLabel extends React.Component<{}, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;


  update = (update: MemoryUsageUpdate) => {
    this.setState({
      maxMemory: update.memCapacity,
      currentMemory: update.memoryActiveUsageBytes
    })
  }
  componentDidMount() {
    memoryUsage(this.context).watch(this.update);
  }

  componentWillUnmount() {
    memoryUsage(this.context).remove(this.update);
  }
  render() {
    if (!this.state || !this.state.currentMemory || !this.state.maxMemory) {
      return;
    }
    return <div className={"memory-info"}>
      <div className={"memory-title"}>MEMORY</div>
      <div style={{flexGrow: 1}} />
      <div>{formatBinaryBytes(this.state.currentMemory)} / {formatBinaryBytes(this.state.maxMemory)}</div>
    </div>
  }

}