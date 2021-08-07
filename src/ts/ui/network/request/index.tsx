import * as React from "react";
import HexagonBadge from "../../common/hexagonStatus";
import {WebUpdate} from "../../../data/network";
import {webRequest} from "../../observer/network";
import {BackendContext} from "../../backendContext";


export default class WebHexagonBadge extends React.Component<{}, {}> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  getValue = (update: WebUpdate) => update.latency && update.latency >= 0 && update.responseCode === 200
    ? update.latency.toFixed(0)
    : update.responseCode.toFixed(0) || "ERR";
  isError = (update: WebUpdate) => !(update.latency && update.latency >= 0 && update.responseCode === 200);

  render() {
    return <HexagonBadge
      observable={webRequest(this.context)}
      getValue={this.getValue}
      isError={this.isError}
      className={"network-primary-fill"}
    />
  }
}
