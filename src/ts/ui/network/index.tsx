import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import NetworkUsageGraph from "./usage";

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
