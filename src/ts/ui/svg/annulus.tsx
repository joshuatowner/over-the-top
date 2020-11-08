import * as React from "react";
import {AnnulusPosition} from "../../util/vec2";

interface PropType {
  position: AnnulusPosition
  className?: string
}

export default class Annulus extends React.Component<PropType, {}> {

  private getPath(): string {
    const {cx, cy, innerRadius, outerRadius}
      = this.props.position;
    return `
      M ${cx} ${cy - outerRadius}
      A ${outerRadius} ${outerRadius} 0 1 0 ${cx} ${cy + outerRadius}
      A ${outerRadius} ${outerRadius} 0 1 0 ${cx} ${cy - outerRadius}
      Z
      M ${cx} ${cy-innerRadius}
      A ${innerRadius} ${innerRadius} 0 1 1 ${cx} ${cy + innerRadius}
      A ${innerRadius} ${innerRadius} 0 1 1 ${cx} ${cy - innerRadius}
      Z
    `
  }

  render() {
    return (
      <path d={this.getPath()} className={this.props.className} />
    )
  }
}