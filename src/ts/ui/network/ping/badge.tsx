import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import {ping, pingUpdate} from "../../../backend/network";
import {PingUpdate} from "../../../data/network";

interface PropType {
  position: Vec2;
  size: Size;
}

interface StateType {
  value: string;
  error: boolean;
}

export default class PingBadge extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      value: "",
      error: false
    };
  }

  onUpdate = (update: PingUpdate) => {
    const value = update.latency && update.latency >= 0 ? update.latency.toFixed(0) : "ERR";
    const error = !update.latency || update.latency < 0;
    this.setState({ value, error })
  }

  componentDidMount() {
    ping.watch(this.onUpdate);
  }

  componentWillUnmount() {
    ping.remove(this.onUpdate);
  }

  render() {
    const { position, size } = this.props;
    return <g>
      <rect x={position.x} y={position.y} width={size.width} height={size.height} />
      <text x={position.x + size.width / 2} y={position.y + size.height / 2}
            className={"network-ping-text"} dominantBaseline={"central"} textAnchor={"middle"}>
        <tspan className={"network-ping-label"}>Ping: </tspan>
        {this.state.error ? "ERROR" : this.state.value}
      </text>
    </g>
  }
}
