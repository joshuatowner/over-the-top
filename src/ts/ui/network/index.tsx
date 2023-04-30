import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import NetworkUsageGraph from "./usage";
import PingHexagonBadge from "./ping";
import WebHexagonBadge from "./request";
import NetworkInterfaceSettingDropdown from "../config/network/interface";
import NetworkUsageDotflowGraph from "./usage/dotflow";

export class NetworkUsageWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"network-usage"}>
        <NetworkUsageDotflowGraph size={pixelSize} />
      </div>
    );
  }

  renderSettings(): React.ReactNode | null {
    return <NetworkInterfaceSettingDropdown/>
  }
}

export class PingWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"network-ping flex-col"}>
        <div className={"widget-title"}>
          <div className={"network-hex-title"}>PING</div>
          <div className={"network--hex-subtitle"}>8.8.8.8</div>
        </div>
        <div className={"hexagon-container"}><PingHexagonBadge/></div>
      </div>
    );
  }
}

export class WebRequestWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"network-ping flex-col"}>
        <div className={"network-title widget-title"}>
          <div className={"network-hex-title"}>WEB</div>
          <div className={"network-hex-subtitle"}>google.com</div>
        </div>
        <div className={"hexagon-container"}><WebHexagonBadge/></div>
      </div>
    );
  }
}
