import * as React from "react";
import AnnulusSegment from "../../../svg/annulusSegment";
import {AnnulusPosition} from "../../../../util/vec2";

interface PropType {
  numCores: number;
  position: AnnulusPosition;
}

export default class CpuCoreUsageGraphBackground extends React.Component<PropType, {}> {
  render() {
    const backgrounds = [];
    for (let i = 0; i < this.props.numCores; i++) {
      const startAngle = Math.PI * 2 * (i / this.props.numCores);
      const endAngle = Math.PI * 2 * ((i + 1) / this.props.numCores);
      backgrounds.push(<AnnulusSegment
        position={{
          ...this.props.position,
          startAngle, endAngle
        }}
        className={"cpu-cores-background"}
        key={i}
      />);
    }
    return (
      <g>
        <g>{backgrounds}</g>
        <g>
          <circle
            cx={this.props.position.cx}
            cy={this.props.position.cy}
            r={(this.props.position.outerRadius + this.props.position.innerRadius) / 2}
            className={"cpu-cores-background-guide"}
          />
        </g>
      </g>
    );
  }
}
