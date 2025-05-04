import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import * as React from "react";
import {GpuVRamBars} from "./vrambars";
import {GpuGraphLabel} from "./label";

export class GpuUsageWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"memory-usage"}>
        <GpuGraphLabel />
        <svg
          viewBox={`0 0 ${pixelSize.width} ${pixelSize.height}`}
          className={'memory-usage-graph full'}
          preserveAspectRatio="xMidYMid meet"
        >
          <GpuVRamBars position={{x: 0, y: 10}} size={{width: pixelSize.width, height: pixelSize.height - 20}} barSize={2} barSpacing={10} />
        </svg>
      </div>
    );
  }
}