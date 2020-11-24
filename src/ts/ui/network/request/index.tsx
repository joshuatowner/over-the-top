import * as React from "react";
import {getConfig} from "../../../config";
import HexagonBadge from "../../common/hexagonStatus";
import {ping, webRequest} from "../../../backend/network";
import {PingUpdate, WebUpdate} from "../../../data/network";
import Widget from "../../layout/widget";
import {Size} from "../../../util/vec2";
import NetworkUsageGraph from "../usage";


export default class WebHexagonBadge extends React.Component<{}, {}>{

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
