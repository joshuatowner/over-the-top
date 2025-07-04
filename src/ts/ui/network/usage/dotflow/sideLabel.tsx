import * as React from "react";
import {Vec2} from "../../../../util/vec2";

interface PropType {
  centerRight: Vec2;
  height: number;
  label: string;
  reverse?: boolean;
}

export default class DotflowGraphSideLabel extends React.PureComponent<PropType> {
  render() {
    const { centerRight, height, label, reverse } = this.props;
    return <>
      <text
        className={"vertical-text fill-primary " + (reverse ? "network-side-label-right" : "network-side-label")}
        x={centerRight.x + (reverse ? 12 : -6)} y={centerRight.y}
      >
        {label}
      </text>
      <line
        className={"guide-primary"}
        x1={centerRight.x} x2={centerRight.x}
        y1={centerRight.y - height / 2}
        y2={centerRight.y + height / 2}
      />
    </>
  }
}
