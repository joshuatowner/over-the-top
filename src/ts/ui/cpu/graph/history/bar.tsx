import * as React from "react";
import {AnnulusSegmentPosition} from "../../../../util/vec2";
import AnnulusSegment from "../../../svg/annulusSegment";

interface PropType {
  position: AnnulusSegmentPosition;
  percent: number;
  fading: boolean;
}

export default class CpuHistoryGraphBar extends React.Component<PropType, {}> {

  getClass(): string {
    const fadingClass = this.props.fading ? 'cpu-fade-out' : ''
    return `cpu-history-bar ${fadingClass}`
  }

  shouldComponentUpdate(nextProps: Readonly<PropType>, nextState: Readonly<{}>, nextContext: any): boolean {
    return this.props.percent !== nextProps.percent || this.props.fading !== nextProps.fading;
  }

  render() {
    const {innerRadius, outerRadius} = this.props.position;
    const percent = this.props.percent;
    const resizedOuterRadius = innerRadius + (outerRadius - innerRadius) * percent;
    return (
      <AnnulusSegment
        position={{
          ...this.props.position,
          outerRadius: resizedOuterRadius
        }}
        className={this.getClass()}
      />
    );
  }

}
