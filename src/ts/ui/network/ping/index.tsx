import * as React from "react";
import HexagonBadge from "../../common/hexagonStatus";
import {PingUpdate} from "../../../data/network";
import {ping} from "../../observer/network";
import {BackendContext} from "../../backendContext";


export default class PingHexagonBadge extends React.Component<{}, {}> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  getValue = (update: PingUpdate) => update.latency && update.latency >= 0 ? update.latency.toFixed(0) : "ERR";
  isError = (update: PingUpdate) => !(update.latency && update.latency >= 0);

  render() {
    return <HexagonBadge
      observable={ping(this.context)}
      getValue={this.getValue}
      isError={this.isError}
      className={"network-hexagon-normal"}
    />
  }
}
