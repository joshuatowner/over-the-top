import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import CpuUsageGraph from "./graph";

export default class CpuUsageWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"cpu-usage"}>
        <CpuUsageGraph/>
      </div>
    );
  }

}
