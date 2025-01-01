import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import {getColorForPercentage, GREY_WHITE_GRADIENT} from "../../util/gradient";

interface PropType {
  value: number;
  position: Vec2;
  size: Size;
}

export default class UsageGridItem extends React.Component<PropType> {

  render() {
    return <><rect
      fill={getColorForPercentage(this.props.value, GREY_WHITE_GRADIENT)}
      className={"usage-grid-item"}
      {...this.props.size}
      {...this.props.position}
    /></>
  }
}
