import * as React from "react";
import {CSSProperties, ReactNode} from "react";
import {pointToPixel} from "./points";
import {Size, Vec2} from "../../util/vec2";

interface WidgetProps {
  initialTopLeft: Vec2,
  initialBottomRight: Vec2,
  windowSize: Size,
  title?: string
}

export default abstract class Widget extends React.Component<WidgetProps, {}>{

  protected topLeftPoint: Vec2;
  protected bottomRightPoint: Vec2;

  constructor(props: WidgetProps) {
    super(props);
    this.topLeftPoint = props.initialTopLeft;
    this.bottomRightPoint = props.initialBottomRight;
  }

  protected getPixelSize(): Size {
    const topLeftPixel = this.getPixelTopLeft();
    const bottomRightPixel = this.getPixelBottomRight();
    return {
      height: bottomRightPixel.y - topLeftPixel.y,
      width: bottomRightPixel.x - topLeftPixel.x,
    }
  }

  protected getPixelTopLeft(): Vec2 {
    return pointToPixel(this.props.windowSize, this.topLeftPoint);
  }

  protected getPixelBottomRight(): Vec2 {
    return pointToPixel(this.props.windowSize, this.bottomRightPoint);
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

  render() {
    return (<div className={"widget"} style={this.getCSSStyle()}>
      {this.renderContent(this.getPixelSize())}
    </div>)
  }
}