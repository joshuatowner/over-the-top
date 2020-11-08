import * as React from "react";
import {AnnulusSegmentPosition} from "../../util/vec2";

interface PropType {
  position: AnnulusSegmentPosition
  className?: string
}

export default class AnnulusSegment extends React.Component<PropType, {}> {

  private getPath(): string {
    const {cx, cy, innerRadius, outerRadius, startAngle, endAngle}
      = this.props.position;
    const point1 = {
      x: innerRadius * Math.cos(startAngle) + cx,
      y: innerRadius * Math.sin(startAngle) + cy
    };
    const point2 = {
      x: innerRadius * Math.cos(endAngle) + cx,
      y: innerRadius * Math.sin(endAngle) + cy
    };
    const point3 = {
      x: outerRadius * Math.cos(endAngle) + cx,
      y: outerRadius * Math.sin(endAngle) + cy
    };
    const point4 = {
      x: outerRadius * Math.cos(startAngle) + cx,
      y: outerRadius * Math.sin(startAngle) + cy
    };
    return `
      M ${point1.x} ${point1.y}
      A ${innerRadius} ${innerRadius} 0 0 1 ${point2.x} ${point2.y}
      L ${point3.x} ${point3.y}
      A ${outerRadius} ${outerRadius} 0 0 0 ${point4.x} ${point4.y}
      Z
    `
  }

  render() {
    return (
      <path d={this.getPath()} className={this.props.className} />
    )
  }
}