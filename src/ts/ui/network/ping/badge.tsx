import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import {ping, pingUpdate} from "../../../backend/network";
import {PingUpdate} from "../../../data/network";
import BadgeStatus from "../../common/BadgeStatus";

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
    const error = !update.latency || update.latency < 0;
    const value = update.latency && update.latency >= 0 ? update.latency.toFixed(0) : "ERR";
    this.setState({ value, error })
  }

  componentDidMount() {
    ping.watch(this.onUpdate);
  }

  componentWillUnmount() {
    ping.remove(this.onUpdate);
  }

  render() {
    return <BadgeStatus {...this.state} {...this.props} label={"PING"} />
  }
}
