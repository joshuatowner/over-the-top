import React from "react";
import {Size, Vec2} from "../../util/vec2";

interface PropType {
  value: string;
  error: boolean;
  label: string;
  position: Vec2;
  size: Size;
  className?: string;
  iconName?: string;
}

export default class BadgeStatus extends React.PureComponent<PropType> {

  getClass = () => {
    if (this.props.error) {
      return "badge-error";
    } else if (this.props.value == "") {
      return "badge-unknown";
    } else {
      return "badge";
    }
  }

  render() {
    const {value, error, label, position, size} = this.props;
    return <g className={this.props.className}>
      <text x={position.x + size.width / 2} y={position.y + size.height / 2}
            className={"badge-text"} dominantBaseline={"central"} textAnchor={"middle"}>
        {this.props.iconName && <tspan className={"icon"}>{this.props.iconName}</tspan>}
        <tspan className={"badge-label"}>{label} </tspan>
        {error ? "ERR" : value}
      </text>
    </g>
  }
}
