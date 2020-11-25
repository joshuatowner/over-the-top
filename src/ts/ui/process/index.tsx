import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import * as React from "react";
import CpuProcesses from "./cpu";
import MemoryProcesses from "./mem";

export class CpuProcessesWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"flex-col"}>
        <div className={"cpu-proc-title widget-title"}>PROCESSES BY CPU</div>
        <CpuProcesses/>
      </div>
    );
  }

}

export class MemoryProcessesWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"flex-col"}>
        <div className={"mem-proc-title widget-title"}>PROCESSES BY MEMORY</div>
        <MemoryProcesses/>
      </div>
    );
  }

}
