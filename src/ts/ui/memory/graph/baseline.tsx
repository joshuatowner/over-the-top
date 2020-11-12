import * as React from "react";

interface PropType {
  numBars: number;
  dashWidth: number;
  dashSpace: number;
  y: number;
}

export default class MemoryUsageGraphBaseline extends React.Component<PropType, {}>{
  render() {
    const {dashWidth, dashSpace, y} = this.props;
    const bars = [];
    for (let i = 0; i < this.props.numBars; i++) {
      bars.push(<line
        x1={(dashWidth + dashSpace) * i}
        x2={(dashWidth + dashSpace) * i + dashWidth}
        y1={y} y2={y} key={i}
        className={"graph-mid-line"}
      />)
    }
    return <g>{bars}</g>
  }
}
