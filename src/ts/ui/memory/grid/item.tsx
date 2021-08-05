import React from "react";
import {Size, Vec2} from "../../../util/vec2";

interface PropType {
  value: number;
  position: Vec2;
  size: Size;
}

export default class UsageGridItem extends React.Component<PropType> {

  shouldComponentUpdate(nextProps: Readonly<PropType>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.value !== nextProps.value;
  }

  render() {
    return <><rect
      className={"usage-grid-item"}
      {...this.props.size}
      {...this.props.position}
    /></>
  }
}
