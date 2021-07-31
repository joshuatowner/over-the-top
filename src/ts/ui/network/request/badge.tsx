import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import {ping, webRequest} from "../../../backend/network";
import {PingUpdate, WebUpdate} from "../../../data/network";
import BadgeStatus from "../../common/BadgeStatus";

interface PropType {
  position: Vec2;
  size: Size;
}

interface StateType {
  value: string;
  error: boolean;
}

export default class RequestBadge extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      value: "",
      error: false
    };
  }

  onUpdate = (update: WebUpdate) => {
    const value = (update.latency && update.latency >= 0 && update.responseCode === 200)
      ? update.latency.toFixed(0)
      : update.responseCode.toFixed(0) || "ERR";
    const error = !update.latency || update.latency < 0 || update.responseCode !== 200
    this.setState({value, error});
  }

  componentDidMount() {
    webRequest.watch(this.onUpdate);
  }

  componentWillUnmount() {
    webRequest.remove(this.onUpdate);
  }

  render() {
    return <BadgeStatus {...this.state} {...this.props} label={"WEB"} />
  }
}
