import * as React from "react";
import {Size, Vec2} from "../../../util/vec2";
import LinearGraphBaseline from "../../common/linearGraph/baseline";

interface PropType {
  numBars: number;
  dashWidth: number;
  dashSpace: number;
  size: Size;
  topLeft: Vec2;
  midLabel?: string;
  topLabel?: string;
  inverted?: boolean;
}

export default class LinearGraphBackground extends React.Component<PropType, {}> {

  inverted = () => !!(this.props.inverted);
  direction = () => this.inverted() ? -1 : 1;
  maxHeight = () => this.inverted() ? this.props.size.height + this.props.topLeft.y : this.props.topLeft.y;
  midHeight = () => this.maxHeight() + this.direction() * (this.props.size.height - this.props.dashSpace) / 2;
  baseHeight = () => this.maxHeight() + this.direction() * this.props.size.height;

  render() {
    const {size, topLeft} = this.props;
    return (
      <g className={this.inverted() ? "linear-graph-inverted" : ""}>
        <LinearGraphBaseline
          numBars={this.props.numBars}
          dashWidth={this.props.dashWidth}
          dashSpace={this.props.dashSpace}
          y={this.baseHeight()}
        />
        <line
          className={"memory-usage-lineargraph-legend-line background-secondary-stroke"}
          x1={topLeft.x} y1={this.maxHeight()}
          x2={topLeft.x + size.width} y2={this.maxHeight()}
        />
        <text
          className={"linear-graph-legend-label background-secondary-fill"}
          x={topLeft.x + size.width} y={this.maxHeight() + this.direction() * 4}
        >
          {this.props.topLabel || "100%"}
        </text>
        <line
          className={"memory-usage-lineargraph-legend-line background-secondary-stroke"}
          x1={topLeft.x} y1={this.midHeight()}
          x2={topLeft.x + size.width} y2={this.midHeight()}
        />
        <text
          className={"linear-graph-legend-label background-secondary-fill"}
          x={topLeft.x + size.width} y={this.midHeight() + this.direction() * 4}
        >
          {this.props.midLabel || "50%"}
        </text>
      </g>
    )
  }
}
