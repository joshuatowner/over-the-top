import * as React from "react";
import {Size} from "../../../util/vec2";

const DASH_WIDTH = 12;
const DASH_SPACE = 4;

interface PropType {
  size: Size;
}

export default class LinearGraph extends React.Component<PropType, {}>{

  dashWidth = DASH_WIDTH;
  dashSpace = DASH_SPACE;

  viewboxHeight = () => this.props.size.height;
  viewboxWidth = () => this.props.size.width - (this.props.size.width % (DASH_WIDTH + DASH_SPACE)) + DASH_WIDTH;
  numBars = () => Math.ceil(this.viewboxWidth() / (DASH_SPACE + DASH_WIDTH));
}
