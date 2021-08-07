import * as React from "react";
import {AnnulusPosition, AnnulusSegmentPosition} from "../../../../util/vec2";
import {SpeedBar} from "./bar";
import {CpuSpeedUpdate} from "../../../../data/cpu";
import {cpuSpeed} from "../../../observer/cpu";
import {BackendContext} from "../../../backendContext";

// TODO refactor file

interface PropType {
  position: AnnulusPosition;
  numSegments?: number;
}

interface StateType {
  currentSpeed?: number;
  maxSpeed?: number;
}

const START_ANGLE = Math.PI * (3/4);
const END_ANGLE = Math.PI * (9/4);
const LINEAR_STEPS = 10;

export default class CpuSpeedGraph extends React.Component<PropType, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {};
  }

  updateUsage = (update: CpuSpeedUpdate) => {
    const oldSpeed = this.state.currentSpeed || 0;
    for (let i = 0; i < 10; i++) {
      setTimeout(() => {
        this.setState({
          currentSpeed: oldSpeed + (update.speed - oldSpeed) * (i / LINEAR_STEPS)
        })
      }, (i / LINEAR_STEPS) * cpuSpeed(this.context).interval)
    }
  }

  componentDidMount() {
    this.context.cpuInfo().then(info => this.setState({
      maxSpeed: info.maxSpeed || 0
    }));
    cpuSpeed(this.context).watch(this.updateUsage);
  }

  componentWillUnmount() {
    cpuSpeed(this.context).remove(this.updateUsage);
  }

  render() {
    const numSegments = this.props.numSegments || 75;
    if (!this.state.currentSpeed || !this.state.maxSpeed) {
      return null;
    }
    const graphPosition: AnnulusSegmentPosition = {
      ...this.props.position,
      startAngle: START_ANGLE,
      endAngle: END_ANGLE
    }
    const percentSpeed = this.state.currentSpeed / this.state.maxSpeed;
    const list = [];
    for (let i = 0; i <= numSegments; i++) {
      const percent = i / numSegments;
      list.push(<SpeedBar
        graphPosition={graphPosition}
        percent={percent}
        active={percent <= percentSpeed}
        key={i}
      />);
    }
    return (
      <g>
        {list}
      </g>
    );
  }

}
