import * as React from "react";
import {CSSProperties, ReactNode} from "react";
import {pointToPixel} from "./points";
import {Size, Vec2} from "../../util/vec2";
import SettingsButton from "../config/button";

interface WidgetProps {
  topLeft: Vec2,
  size: Size,
  windowSize: Size,
  title?: string
}

export default abstract class Widget extends React.Component<WidgetProps, {}>{

  constructor(props: WidgetProps) {
    super(props);
  }

  protected getPixelSize(): Size {
    const topLeftPixel = this.getPixelTopLeft();
    const bottomRightPixel = this.getPixelBottomRight();
    return {
      height: bottomRightPixel.y - topLeftPixel.y,
      width: bottomRightPixel.x - topLeftPixel.x,
    }
  }

  private getContentSize(): Size {
    const pixelSize = this.getPixelSize();
    return {
      height: pixelSize.height - 24,
      width: pixelSize.width - 20
    }
  }

  protected getPixelTopLeft(): Vec2 {
    return pointToPixel(this.props.windowSize, this.props.topLeft);
  }

  protected getPixelBottomRight(): Vec2 {
    return pointToPixel(this.props.windowSize, {
      x: this.props.topLeft.x + this.props.size.width,
      y: this.props.topLeft.y + this.props.size.height,
    });
  }

  private getCSSStyle(): CSSProperties {
    const topLeft = this.getPixelTopLeft();
    const size = this.getPixelSize();
    return {
      position: "absolute",
      left: `${topLeft.x - 1}px`,
      top: `${topLeft.y - 1}px`,
      width: `${size.width + 2}px`,
      height: `${size.height + 2}px`
    }
  }

  abstract renderContent(pixelSize: Size): ReactNode;

  renderSettings(): ReactNode | null {
    return null;
  };

  render() {
    const settings = this.renderSettings();
    const showSettings = settings !== null;
    return (<div className={"widget"} style={this.getCSSStyle()}>
      {showSettings && <SettingsButton>
        {settings}
      </SettingsButton>}
      {this.renderContent(this.getContentSize())}
    </div>)
  }
}
