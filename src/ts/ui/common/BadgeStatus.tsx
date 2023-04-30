import React from "react";
import {Size, Vec2} from "../../util/vec2";

interface PropType {
  value: string;
  error: boolean;
  label: string;
  position: Vec2;
  size: Size;
  className?: string;
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
      {/*<rect x={position.x} y={position.y} width={size.width} height={size.height} className={this.getClass()}/>*/}
      <text x={position.x + size.width / 2} y={position.y + size.height / 2}
            className={"badge-text"} dominantBaseline={"central"} textAnchor={"middle"}>
        <tspan className={"badge-label"}>{label} </tspan>
        {error ? "ERR" : value}
      </text>
    </g>
  }
}
