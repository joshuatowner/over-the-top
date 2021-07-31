import * as React from "react";
import {Size, Vec2} from "../../../../util/vec2";

interface PropType {
  position: Vec2;
  size: Size;
  lines: number;
  major: number;
  reverse: boolean;
}

export default class DotflowGraphLegend extends React.PureComponent<PropType> {
  render() {
    const {position, size, lines, major} = this.props;
    const components = [];
    for (let i = 0; i < lines; i++) {
      const primary = i % major == 0;
      const x = position.x + size.width * (i / lines);
      let y1 = position.y + (primary ? 0 : size.height / 2);
      let y2 = position.y + size.height;
      if (this.props.reverse && !primary) {
        y2 = position.y
      }
      const className = primary ? "dotflow-guide-primary" : "dotflow-guide";
      components.push(
        <line key={i} x1={x} x2={x} y1={y1} y2={y2} className={className} />
      )
    }
    return components;
  }
}
