import * as React from "react";
import {CSSProperties} from "react";
import {PieSegmentPosition} from "../../util/vec2";

interface PropType {
  position: PieSegmentPosition
  className?: string
  style?: CSSProperties
}

export default class PieSegment extends React.Component<PropType, {}> {

  private getPath(): string {
    const {cx, cy, r, startAngle, endAngle}
      = this.props.position;
    const point1 = {x: cx, y: cy};
    const point2 = {
      x: r * Math.cos(startAngle) + cx,
      y: r * Math.sin(startAngle) + cy
    };
    const point3 = {
      x: r * Math.cos(endAngle) + cx,
      y: r * Math.sin(endAngle) + cy
    };
    return `
      M ${point1.x} ${point1.y}
      L ${point2.x} ${point2.y}
      A ${r} ${r} 0 0 1 ${point3.x} ${point3.y}
      Z
    `
  }

  render() {
    return (
      <path
        d={this.getPath()}
        className={this.props.className}
        style={this.props.style}
      />
    )
  }
}
