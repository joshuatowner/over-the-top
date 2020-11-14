import * as React from "react";
import {Size, Vec2} from "../../../util/vec2";
import LinearGraphBaseline from "../../common/linearGraph/baseline";

interface PropType {
  numBars: number;
  dashWidth: number;
  dashSpace: number;
  size: Size;
  topLeft: Vec2;
}

export default class LinearGraphBackground extends React.Component<PropType, {}>{
  render() {
    const {size, topLeft} = this.props;
    return (
      <g>
        <LinearGraphBaseline
          numBars={this.props.numBars}
          dashWidth={this.props.dashWidth}
          dashSpace={this.props.dashSpace}
          y={this.props.topLeft.y + this.props.size.height}
        />
        <line
          className={"memory-usage-graph-legend-line background-secondary-stroke"}
          x1={topLeft.x} y1={topLeft.y}
          x2={topLeft.x + size.width} y2={topLeft.y}
        />
        <text
          className={"memory-usage-graph-legend-label background-secondary-fill"}
          x={topLeft.x + size.width} y={topLeft.y + 2}
        >
          100%
        </text>
        <line
          className={"memory-usage-graph-legend-line background-secondary-stroke"}
          x1={topLeft.x} y1={topLeft.y + (this.props.size.height - this.props.dashSpace) / 2}
          x2={topLeft.x + size.width} y2={topLeft.y + (this.props.size.height - this.props.dashSpace) / 2}
        />
        <text
          className={"memory-usage-graph-legend-label background-secondary-fill"}
          x={topLeft.x + size.width} y={topLeft.y + 2 + (this.props.size.height - this.props.dashSpace) / 2}
        >
          50%
        </text>
      </g>
    )
  }
}
