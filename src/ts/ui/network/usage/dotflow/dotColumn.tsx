import * as React from "react";
import {shuffleArray} from "../../../util/list";
import {Vec2} from "../../../../util/vec2";
import {StyledComponent} from "styled-components";
import {laneHeight} from "./util";

interface PropType {
  value: number;
  height: number;
  lanes: number;
  dotRadius: number;
  position: Vec2;
  groupClass: StyledComponent<"g", any>;
}

export default class DotflowGraphDotColumn extends React.Component<PropType, never> {

  laneNumbers: number[]

  constructor(props: PropType, context: any) {
    super(props, context);
    this.laneNumbers = Array.from(Array(props.lanes).keys());
  }

  private laneHeight = (lane: number) => laneHeight(lane, this.props.lanes, this.props.height);

  shouldComponentUpdate(nextProps: Readonly<PropType>, nextState: Readonly<never>, nextContext: any): boolean {
    return this.props.value !== nextProps.value;
  }

  render() {
    const numLanes: number = Math.round(this.props.value * this.props.lanes);
    shuffleArray(this.laneNumbers);
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
