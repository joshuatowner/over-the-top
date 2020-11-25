import * as React from "react";
import HexagonBadge from "../../common/hexagonStatus";
import {webRequest} from "../../../backend/network";
import {WebUpdate} from "../../../data/network";


export default class WebHexagonBadge extends React.Component<{}, {}> {

  getValue = (update: WebUpdate) => update.latency && update.latency >= 0 && update.responseCode === 200
    ? update.latency.toFixed(0)
    : update.responseCode.toFixed(0) || "ERR";
  isError = (update: WebUpdate) => !(update.latency && update.latency >= 0 && update.responseCode === 200);

  render() {
    return <HexagonBadge
      observable={webRequest}
      getValue={this.getValue}
      isError={this.isError}
      className={"network-primary-fill"}
    />
  }
}
