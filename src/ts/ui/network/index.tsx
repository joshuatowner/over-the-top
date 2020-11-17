import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import NetworkUsageGraph from "./usage";
import PingHexagonBadge from "./ping";
import WebHexagonBadge from "./request";

export class NetworkUsageWidget extends Widget {
    renderContent(pixelSize: Size): React.ReactNode {
        return (
          <div className={"network-usage"}>
              <div className={"network-title widget-title"}>NETWORK USAGE</div>
              <NetworkUsageGraph size={{
                  width: pixelSize.width,
                  height: pixelSize.height - 35
              }} />
          </div>
        );
    }
}

export class PingWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"network-ping flex-col"}>
        <div className={"network-title widget-title"}>
          <div>PING</div>
          <div className={"network-subtitle"}>8.8.8.8</div>
        </div>
        <div className={"hexagon-container"}><PingHexagonBadge /></div>
      </div>
    );
  }
}

export class WebRequestWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"network-ping flex-col"}>
        <div className={"network-title widget-title"}>
          <div>WEB</div>
          <div className={"network-subtitle"}>google.com</div>
        </div>
        <div className={"hexagon-container"}><WebHexagonBadge /></div>
      </div>
    );
  }
}
