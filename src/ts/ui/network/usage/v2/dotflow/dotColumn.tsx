import * as React from "react";

import {laneHeight} from "./util";
import {Vec2} from "../../../../../util/vec2";
import {shuffleArray} from "../../../../util/list";

interface PropType {
  value: number;
  height: number;
  lanes: number;
  dotRadius: number;
  position: Vec2;
  groupClass: any;
}

export default class DotflowGraphDotColumn extends React.Component<PropType, never> {

  laneNumbers: number[];

  constructor(props: PropType, context: any) {
    super(props, context);
    this.laneNumbers = Array.from(Array(props.lanes).keys());
    shuffleArray(this.laneNumbers);
  }

  private laneHeight = (lane: number) => laneHeight(lane, this.props.lanes, this.props.height);

  // shouldComponentUpdate(nextProps: Readonly<PropType>, nextState: Readonly<never>, nextContext: any): boolean {
  //   return this.props.value !== nextProps.value;
  // }

  render() {
    const numLanes: number = Math.round(this.props.value * this.props.lanes);
    const lanes: number[] = this.laneNumbers.slice(0, numLanes);
    return lanes.length > 0 && <this.props.groupClass>
      {lanes.map((lane, i) => (
        <circle r={this.props.dotRadius}
                cx={this.props.position.x}
                cy={this.props.position.y + this.laneHeight(lane)}
                className={"network-usage-dot"}
                key={i}
        />
      ))}
    </this.props.groupClass>;
  }

}
