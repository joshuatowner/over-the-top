import * as React from "react";
import Annulus from "../../../svg/annulus";
import {AnnulusPosition} from "../../../../util/vec2";

interface PropType {
  position: AnnulusPosition
}

export default class CpuHistoryGraphBackground extends React.Component<PropType, {}> {

  render() {
    const list = [];
    for (let i = 0; i < 72; i++) {
      const startX = this.props.position.outerRadius * Math.cos(2 * Math.PI / 72 * i) + this.props.position.cx;
      const startY = this.props.position.outerRadius * Math.sin(2 * Math.PI / 72 * i) + this.props.position.cy;
      const innerRadius = this.props.position.innerRadius +
        (this.props.position.outerRadius - this.props.position.innerRadius) * (1 - (i % 3 === 0 ? (1/4) : (1/8)));
      const endX = innerRadius * Math.cos(2 * Math.PI / 72 * i) + this.props.position.cx;
      const endY = innerRadius * Math.sin(2 * Math.PI / 72 * i) + this.props.position.cy;
      const className = i % 3 === 0 ? "cpu-history-background-compass-guide-primary" : "cpu-history-background-compass-guide";
      list.push(<line x1={startX} y1={startY} x2={endX} y2={endY} className={className} key={i}/>);
    }

    const {innerRadius, outerRadius} = this.props.position;
    const radius = outerRadius - innerRadius;

    return (
      <>
        <Annulus
          position={this.props.position}
          className={"cpu-history-background"}
        />
        <circle
          className={"cpu-history-background-inner"}
          cx={this.props.position.cx}
          cy={this.props.position.cy}
          r={innerRadius}
        />
        <circle
          className={"cpu-history-background-outer"}
          cx={this.props.position.cx}
          cy={this.props.position.cy}
          r={outerRadius}
        />
        <circle
          className={"cpu-history-background-guide"}
          cx={this.props.position.cx}
          cy={this.props.position.cy}
          r={innerRadius + radius * (1/4)}
        />
        <circle
          className={"cpu-history-background-guide-primary"}
          cx={this.props.position.cx}
          cy={this.props.position.cy}
          r={innerRadius + radius * (1/2)}
        />
        {list}
      </>
    );
  }

}
