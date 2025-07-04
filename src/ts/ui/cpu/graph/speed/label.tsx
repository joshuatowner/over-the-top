import * as React from "react";
import {Vec2} from "../../../../util/vec2";

interface PropType {
  center: Vec2;
  radius: number;

  maxSpeed: number;
  currentSpeed: number;
}

export class SpeedLabel extends React.Component<PropType, {}> {

  render() {
    const {maxSpeed, currentSpeed} = this.props;
    return <g>
      <SpeedLabelPath center={this.props.center} radius={this.props.radius} />
      <text>
        <textPath href={'#speed-label-path'} className={'cpu-speed-label'} startOffset={'50%'}>
          {currentSpeed.toFixed(2)} GHz / {maxSpeed.toFixed(2)} GHz
        </textPath>
      </text>
    </g>
  }
}


interface PathPropType {
  center: Vec2;
  radius: number;
}
class SpeedLabelPath extends React.PureComponent<PathPropType> {

  private getPath(): string {
    const {radius, center} = this.props;
    return `
      M ${center.x - radius} ${center.y}
      A ${radius} ${radius} 0 0 0 ${center.x + radius} ${center.y}
    `
  }

  render() {
    return <path d={this.getPath()} stroke={'none'} fill={'none'} id={'speed-label-path'}></path>;
  }

}