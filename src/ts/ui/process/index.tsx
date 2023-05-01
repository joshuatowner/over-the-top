import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import * as React from "react";
import {ProcessList} from "./list";


export class ProcessesInfoWidget extends Widget {
  renderContent(pixelSize: Size): React.ReactNode {
    return (
      <div className={"flex-col"}>
        <ProcessList/>
      </div>
    );
  }

}