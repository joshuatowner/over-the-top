import {Size, Vec2} from "../../../util/vec2";
import * as React from "react";
import {BarValue} from "../../util/bar";

interface PropType {
  topLeft: Vec2;
  size: Size;
  value: BarValue;
}

export default class MemoryUsageGraphBar extends React.Component<PropType, {}>{

  constructor(props: Readonly<PropType>) {
    super(props);
  }

  getClass(): string {
    const fadingClass = this.props.value.fading ? 'memory-fade-out' : ''
    return `memory-usage-bar memory-primary-fill ${fadingClass}`
  }

  render() {
    const {topLeft, size, value} = this.props;
    return <rect
      x={topLeft.x}
      y={topLeft.y + size.height * (1 - value.percent)}
      width={size.width}
      height={size.height * value.percent}
      className={this.getClass()}
    />;
  }

}
