import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import * as React from "react";
import CpuProcesses from "./cpu";

export class CpuProcessesWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <>
        <div className={"cpu-proc-title widget-title"}>PROCESSES BY CPU</div>
        <CpuProcesses />
      </>
    );
  }

}

export class MemoryProcessesWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <>
        <div className={"mem-proc-title widget-title"}>PROCESSES BY MEM</div>
        <CpuProcesses />
      </>
    );
  }

}