import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import SwapUsageGraph from "./swap/graph";
import MemoryUsageGraph from "./graph";

export default class MemoryUsageWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"memory-usage"}>
        <div className={"memory-title widget-title"}>MEMORY USAGE</div>
        <MemoryUsageGraph
          size={{ width: pixelSize.width, height: pixelSize.height }}
        />
      </div>
    );
  }

}

export class SwapUsageWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"swap-usage"}>
        <div className={"swap-title widget-title"}>SWAP USAGE</div>
        <SwapUsageGraph size={{
          width: pixelSize.width,
          height: pixelSize.height - 35
        }}/>
      </div>
    );
  }

}
