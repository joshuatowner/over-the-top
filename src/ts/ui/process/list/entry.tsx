import * as React from "react";
import {ProcessUsageInfo} from "../../../data/process";
import { CSSProperties } from "react";
import {formatBinaryBytes} from "../../util/data";

interface PropType extends ProcessUsageInfo {
  maxMem: number;
}

export class ProcessListEntry extends React.Component<PropType, {}> {

  private cpuStr = () => this.props.cpu.toFixed(2);
  private memStr = () => formatBinaryBytes(this.props.mem);
  private cpuPct = () => this.props.cpu / 100;
  private memPct = () => this.props.mem / this.props.maxMem;

  render() {
    return <div className={"process-entry"}>
      <div className={"process-name"}>{this.props.name}</div>
      <div className={"process-value"} style={this.style(this.cpuPct())}>{this.cpuStr()}</div>
      <div className={"process-value"} style={this.style(this.memPct())}>{this.memStr()}</div>
    </div>
  }

  style = (pct: number): CSSProperties => ({
      backgroundColor: `rgba(255, 255, 255, ${Math.min(pct, 1) * (12/255)}`
  })

}