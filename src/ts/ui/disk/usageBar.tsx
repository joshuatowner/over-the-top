import * as React from "react";
import {Size} from "../../util/vec2";
import PieSegment from "../svg/pieSegment";
import {getEndAngle, getStartAngle} from "../util/angle";
import {ONE_BYTE, ONE_GIGABYTE} from "../constants/data";

interface PropType {
  percentUsage: number;
  capacity: number;
  size: Size;
}

export default class PartitionUsageBar extends React.Component<PropType, {}>{

  render() {
    const {width, height} = this.props.size;
    const pieSegments = [];
    const outerRadius = Math.min(width, height) / 2;
    const innerRadius = outerRadius - 5;
    const numSegments = this.getNumSegments(this.props.capacity);
    console.log(numSegments);
    let runningUsage = this.props.percentUsage;
    for (let i = 0; i < numSegments; i++) {
      pieSegments.push(<PieSegment position={{
        cx: width / 2,
        cy: height / 2,
        r: Math.min(width, height) / 2,
        startAngle: getStartAngle(i, numSegments) + 0.05 - Math.PI / 2,
        endAngle: getEndAngle(i, numSegments) - 0.05 - Math.PI / 2,
      }} className={'disk-usage-bar'} style={{
        opacity: this.getOpacity(runningUsage, numSegments) + 0.05,
      }}/>);
      runningUsage -= 100 / numSegments;
    }
    return <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      {...pieSegments}
      <circle
        cx={width / 2}
        cy={height / 2}
        r={innerRadius}
        className={"disk-usage-inner"}
      />
      <text
        className={"disk-usage-label"}
        x="50%" y="50%"
        dominantBaseline="middle" textAnchor="middle"
      >
        {this.props.percentUsage.toFixed(0)}%
      </text>
    </svg>
  }


  getOpacity(runningUsage: number, numSegments: number) {
    const segmentUsage = 100 / numSegments;
    if (runningUsage <= 0) {
      return 0;
    } else if (runningUsage > segmentUsage) {
      return 1;
    } else {
      return runningUsage / segmentUsage;
    }
  }

  getNumSegments(capacity: number) {
    return Math.min(Math.max(Math.ceil(capacity * ONE_BYTE / (ONE_GIGABYTE * 100)), 2), 50);
  }
}
