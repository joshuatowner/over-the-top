import * as React from "react";
import { Size } from "../../../util/vec2";
import Widget from "../../layout/widget";
import DiskDisplay from "../diskDisplay";

export default class UsageBlobsWidget extends Widget {

  renderContent(pixelSize: Size): React.ReactNode {
    return <DiskDisplay
      pixelSize={pixelSize}
      topLeft={this.props.topLeft}
      size={this.props.size}
      windowSize={this.props.windowSize}
    />;
  }
}
