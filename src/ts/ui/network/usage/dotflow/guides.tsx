import * as React from "react";
import {Size, Vec2} from "../../../../util/vec2";
import {laneHeight} from "./util";

interface PropType {
  position: Vec2;
  size: Size;
  lanes: number;
  lines: number;
  major: number;
}

export default class DotflowGraphGuides extends React.Component<PropType> {
  render() {
    const {position, size, lanes, lines, major} = this.props;
    const guides: React.ReactNode[][] = [];
    const segments = Math.floor((lines) / major);
    const gapWidth = size.width / (lines * 2);
    for (let i = 0; i < lanes; i++) {
      const row = []
      for (let j = 0; j < segments; j++) {
        const y = laneHeight(i, lanes, size.height);
        row.push(<line
          className={"guide-tertiary"}
          x1={position.x + (size.width / segments) * j + gapWidth}
          y1={position.y + y}
          x2={position.x + (size.width / segments) * (j + 1) - gapWidth}
          y2={position.y + y}
          key={i}
        />);
      }
      guides.push(row);
    }
    return <g>{guides.map(row => <g>{row}</g>)}</g>;
  }
}
