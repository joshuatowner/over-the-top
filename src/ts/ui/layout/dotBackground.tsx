import * as React from "react";
import {pointToPixel, numPointsX, numPointsY} from "./points";
import {ReactNode} from "react";
import {Size, Vec2} from "../../util/vec2";

interface DotProps {
  size: number,
  center: Vec2,
}

interface DotsProps {
  windowSize: Size,
}

const Dot = (props: DotProps) => {
  return (
    <circle
      className={"background-dot"}
      cx={props.center.x}
      cy={props.center.y}
      r={props.size / 2}
    />
  );
}

export default class DotBackground extends React.Component<DotsProps, {}> {
  render() {
    const dots: ReactNode[] = [];
    for (let i = 0; i < numPointsX(this.props.windowSize); i++) {
      for (let j = 0; j < numPointsY(this.props.windowSize); j++) {
        dots.push(<Dot
          size={2}
          center={pointToPixel(this.props.windowSize, {
            x: i, y: j
          })}
          key={`${i},${j}`}
        />);
      }
    }
    return (<svg className={"background"}>
      {dots}
    </svg>);
  }
}