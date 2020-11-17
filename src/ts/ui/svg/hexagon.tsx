import * as React from "react";
import {Vec2} from "../../util/vec2";
import {CSSProperties} from "react";

interface PropType {
  className?: string;
  style?: CSSProperties;
  center: Vec2;
  height: number;
}

export default class Hexagon extends React.Component<PropType, {}>{

  radius = () => this.props.height / 2;
  angle = Math.PI * 2 / 6;

  points(): string {
    let pointString = "";
    for (let i = 0; i < 6; i++) {
      const x = this.props.center.x + this.radius() * Math.cos(this.angle * i - Math.PI / 2);
      const y = this.props.center.y + this.radius() * Math.sin(this.angle * i - Math.PI / 2);
      pointString += `${x},${y} `
    }
    return pointString;
  }

  render() {
    return <g>
      <polygon
        className={this.props.className}
        style={this.props.style}
        points={this.points()}
      />
    </g>
  }
}
