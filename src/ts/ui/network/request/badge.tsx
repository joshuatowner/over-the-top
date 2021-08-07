import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import {WebUpdate} from "../../../data/network";
import BadgeStatus from "../../common/BadgeStatus";
import {webRequest} from "../../observer/network";
import {BackendContext} from "../../backendContext";

interface PropType {
  position: Vec2;
  size: Size;
}

interface StateType {
  value: string;
  error: boolean;
}

export default class RequestBadge extends React.Component<PropType, StateType> {
  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

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
    webRequest(this.context).watch(this.onUpdate);
  }

  componentWillUnmount() {
    webRequest(this.context).remove(this.onUpdate);
  }

  render() {
    return <BadgeStatus {...this.state} {...this.props} label={"WEB"} />
  }
}
