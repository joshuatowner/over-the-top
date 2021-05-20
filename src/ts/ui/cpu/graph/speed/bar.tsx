import {AnnulusSegmentPosition} from "../../../../util/vec2";
import * as React from "react";


interface PropType {
  graphPosition: AnnulusSegmentPosition;
  percent: number;
  active: boolean;
}

export class SpeedBar extends React.Component<PropType, {}> {
  render() {
    const {innerRadius, outerRadius, startAngle, endAngle, cx, cy} = this.props.graphPosition;
    const angle = startAngle + this.props.percent * (endAngle - startAngle);
    const props = {
      x1: innerRadius * Math.cos(angle) + cx,
      y1: innerRadius * Math.sin(angle) + cy,
      x2: outerRadius * Math.cos(angle) + cx,
      y2: outerRadius * Math.sin(angle) + cy
    }
    const className = this.props.active ? "cpu-speed-bar-active" : "cpu-speed-bar";
    return <line className={className} {...props} />
  }
}
