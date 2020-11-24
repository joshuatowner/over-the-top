import {Size, Vec2} from "../../../util/vec2";
import * as React from "react";
import {BarValue} from "../../util/bar";
import {CSSProperties} from "react";

interface PropType {
  topLeft: Vec2;
  size: Size;
  value: BarValue;
  interval: number;
  inverted?: boolean;
}

export default class LinearGraphBar extends React.Component<PropType, {}>{

  inverted = () => !!(this.props.inverted);

  constructor(props: Readonly<PropType>) {
    super(props);
  }

  getStyle(): CSSProperties {
    if (this.props.value.fading) {
      return {
        animation: `fadeOut ${this.props.interval * 6}ms forwards`
      };
    } else {
      return {};
    }
  }

  render() {
    const {topLeft, size, value} = this.props;
    return <rect
      x={topLeft.x}
      y={this.inverted() ? topLeft.y : topLeft.y + size.height * (1 - value.percent)}
      width={size.width}
      height={size.height * value.percent}
      className={"linear-graph-bar"}
      style={this.getStyle()}
    />;
  }

}
