import * as React from "react";
import {CSSProperties} from "react";
import PieSegment from "../../../svg/pieSegment";
import {getEndAngle, getStartAngle} from "../../../util/angle";
import {AnnulusPosition} from "../../../../util/vec2";
import {CpuUsageUpdate} from "../../../../data/cpu";
import {cpuUsage} from "../../../observer/cpu";
import {BackendContext} from "../../../backendContext";

interface PropType {
  coreId: number;
  numCores: number;
  position: AnnulusPosition;
}

interface StateType {
  coreUsage: number
}

export default class CpuCoreUsageGraphBar extends React.Component<PropType, StateType> {
  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  startAngle: number;
  endAngle: number;

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      coreUsage: 0
    }
    this.startAngle = getStartAngle(this.props.coreId, this.props.numCores);
    this.endAngle = getEndAngle(this.props.coreId, this.props.numCores);
  }

  updateCoreUsage = (update: CpuUsageUpdate) => {
    this.setState({
      coreUsage: update.coreUsages[this.props.coreId]
    })
  }

  componentDidMount() {
    cpuUsage(this.context).watch(this.updateCoreUsage)
  }

  componentWillUnmount() {
    cpuUsage(this.context).remove(this.updateCoreUsage);
  }

  getScaleSize(): number {
    const percent = this.state.coreUsage;
    let {innerRadius, outerRadius} = this.props.position;
    return (innerRadius + (outerRadius - innerRadius) * percent) / outerRadius;
  }

  getScaleStyle(): CSSProperties {
    return {
      transform: `scale(${this.getScaleSize()})`
    }
  }

  render() {
    return (
      <PieSegment
        position={{
          cx: this.props.position.cx,
          cy: this.props.position.cy,
          r: this.props.position.outerRadius,
          startAngle: this.startAngle,
          endAngle: this.endAngle
        }}
        className={'cpu-cores-bar'}
        style={this.getScaleStyle()}
      />
    );
  }
}
