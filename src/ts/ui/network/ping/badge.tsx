import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import {PingUpdate} from "../../../data/network";
import BadgeStatus from "../../common/BadgeStatus";
import {ping} from "../../observer/network";
import {BackendContext} from "../../backendContext";

interface PropType {
  position: Vec2;
  size: Size;
}

interface StateType {
  value: string;
  error: boolean;
}

export default class PingBadge extends React.Component<PropType, StateType> {
  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

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
    ping(this.context).watch(this.onUpdate);
  }

  componentWillUnmount() {
    ping(this.context).remove(this.onUpdate);
  }

  render() {
    return <BadgeStatus {...this.state} {...this.props} label={"PING"} />
  }
}
