import * as React from "react";
import HexagonBadge from "../../common/hexagonStatus";
import {ping} from "../../../backend/network";
import {PingUpdate} from "../../../data/network";


export default class PingHexagonBadge extends React.Component<{}, {}> {

  getValue = (update: PingUpdate) => update.latency && update.latency >= 0 ? update.latency.toFixed(0) : "ERR";
  isError = (update: PingUpdate) => !(update.latency && update.latency >= 0);

  render() {
    return <HexagonBadge
      observable={ping}
      getValue={this.getValue}
      isError={this.isError}
      className={"network-primary-fill"}
    />
  }
}
