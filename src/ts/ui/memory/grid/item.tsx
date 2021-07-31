import React from "react";
import {Size, Vec2} from "../../../util/vec2";

interface PropType {
  value: number;
  position: Vec2;
  size: Size;
}

export default class UsageGridItem extends React.PureComponent<PropType> {

  shouldComponentUpdate(nextProps: Readonly<PropType>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.value !== nextProps.value;
  }

  render() {
    return <><rect
      x={this.props.position.x - this.props.size.width / 2}
      y={this.props.position.y - this.props.size.height / 2}
      width={this.props.size.width}
      height={this.props.size.height}
    /></>
  }
}
