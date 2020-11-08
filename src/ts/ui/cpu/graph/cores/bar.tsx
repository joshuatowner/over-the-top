import * as React from "react";
import AnnulusSegment from "../../../svg/annulusSegment";
import PieSegment from "../../../svg/pieSegment";
import {getEndAngle, getStartAngle} from "../../../util/angle";
import {CSSProperties} from "react";
import {AnnulusPosition} from "../../../../util/vec2";
import {CpuUsageUpdate} from "../../../../data/cpu";
import {cpuUsage} from "../../../../backend/cpu";

interface PropType {
  coreId: number;
  numCores: number;
  position: AnnulusPosition;
}

interface StateType {
  coreUsage: number
}

export default class CpuCoreUsageGraphBar extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      coreUsage: 0
    }
  }

  updateCoreUsage = (update: CpuUsageUpdate) => {
    this.setState({
      coreUsage: update.coreUsages[this.props.coreId]
    })
  }

  componentDidMount() {
    cpuUsage.watch(this.updateCoreUsage)
  }

  componentWillUnmount() {
    cpuUsage.remove(this.updateCoreUsage);
  }

  getScaleSize(): number {
    const percent = this.state.coreUsage;
    const {innerRadius, outerRadius} = this.props.position;
    return (innerRadius + (outerRadius - innerRadius) * percent) / outerRadius;
  }

  getScaleStyle(): CSSProperties {
    const {cx, cy} = this.props.position;
    return {
      transform: `scale(${this.getScaleSize()})`
    }
  }

  render() {
    const startAngle = getStartAngle(this.props.coreId, this.props.numCores);
    const endAngle = getEndAngle(this.props.coreId, this.props.numCores);
    return (
      <PieSegment
        position={{
          cx: this.props.position.cx,
          cy: this.props.position.cy,
          r: this.props.position.outerRadius,
          startAngle, endAngle
        }}
        className={'cpu-cores-bar cpu-primary-fill'}
        style={this.getScaleStyle()}
      />
    );
  }
}