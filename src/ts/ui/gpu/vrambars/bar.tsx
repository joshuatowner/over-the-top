import React, {Component} from "react";
import {Size, Vec2} from "../../../util/vec2";
import {getColorForPercentage, GREY_WHITE_GRADIENT} from "../../util/gradient";

interface PropType {
  usage: number;
  position: Vec2;
  size: Size;
}

export class GpuVramBar extends Component<PropType, {}> {
  constructor(props: PropType) {
    super(props);
  }

  render() {
    return <>
      <rect
        fill={getColorForPercentage(this.props.usage, GREY_WHITE_GRADIENT)}
        className={"usage-grid-item"}
        {...this.props.size}
        {...this.props.position}
      />
    </>
  }

}