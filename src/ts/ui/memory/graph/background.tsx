import * as React from "react";
import MemoryUsageGraphBaseline from "./baseline";
import {Size, Vec2} from "../../../util/vec2";

interface PropType {
  numBars: number;
  dashWidth: number;
  dashSpace: number;
  size: Size;
  topLeft: Vec2;
}

export default class MemoryUsageGraphBackground extends React.Component<PropType, {}>{
  render() {
    return (
      <MemoryUsageGraphBaseline
        numBars={this.props.numBars}
        dashWidth={this.props.dashWidth}
        dashSpace={this.props.dashSpace}
        y={this.props.topLeft.y + this.props.size.height}
      />
    )
  }
}
