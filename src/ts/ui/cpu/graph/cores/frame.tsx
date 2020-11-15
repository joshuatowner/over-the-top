import * as React from "react";
import {ReactNode} from "react";
import AnnulusSegment from "../../../svg/annulusSegment";
import {getEndAngle, getStartAngle} from "../../../util/angle";
import {AnnulusPosition} from "../../../../util/vec2";

interface PropType {
  numCores: number;
  position: AnnulusPosition
}

export default class CpuCoreUsageGraphFrame extends React.Component<PropType, {}> {
  render() {
    const frames: ReactNode[] = [];
    for (let i = 0; i < this.props.numCores; i++) {
      const startAngle = getStartAngle(i, this.props.numCores);
      const endAngle = getEndAngle(i, this.props.numCores);
      frames.push(<AnnulusSegment
        position={{
          ...this.props.position,
          startAngle, endAngle
        }}
        className={"cpu-cores-frame-segment background-primary-stroke"}
        key={i}
      />);
    }
    frames.push(<circle
      cx={this.props.position.cx} cy={this.props.position.cy}
      r={this.props.position.innerRadius}
      className={"cpu-cores-frame-center background-primary-fill"}
      key={this.props.numCores}
    />);
    return (
      <g>
        {frames}
      </g>
    );
  }
}
