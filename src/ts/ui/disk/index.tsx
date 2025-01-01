import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import * as React from "react";
import DiskRows from "./diskRows";

export default class PartitionWidget extends Widget{
  renderContent(pixelSize: Size): React.ReactNode {
    return <div className={"widget-content"}>
      <DiskRows />
    </div>;
  }

}
