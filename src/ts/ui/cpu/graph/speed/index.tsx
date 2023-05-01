import * as React from "react";
import {AnnulusPosition, AnnulusSegmentPosition} from "../../../../util/vec2";
import {SpeedBar} from "./bar";
import {cpuSpeed} from "../../../observer/cpu";
import {BackendContext} from "../../../backendContext";
import {SpeedLabel} from "./label";
import LinearInterpolatedObservable from "../../../../data/observable/linearInterpolatedObservable";
import AppliedObservable from "../../../../data/observable/appliedObservable";
import IntervalObservable from "../../../../data/observable/intervalObservable";
import {CpuSpeedUpdate} from "../../../../data/cpu";

// TODO refactor file

interface PropType {
  position: AnnulusPosition;
  numSegments?: number;
}

interface StateType {
  currentSpeedLinear?: number;
  currentSpeed?: number;
  maxSpeed?: number;
}

const START_ANGLE = Math.PI * (3/4);
const END_ANGLE = Math.PI * (9/4);

export default class CpuSpeedGraph extends React.Component<PropType, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  speed: IntervalObservable<CpuSpeedUpdate>;
  speedLinear: IntervalObservable<number>;

  constructor(props: Readonly<PropType>, context: any) {
    super(props, context);
    this.state = {};
    this.speed = cpuSpeed(this.context);
    this.speedLinear = new LinearInterpolatedObservable(
      new AppliedObservable(this.speed, update => update.speed), 50);
  }

  updateUsage = (update: CpuSpeedUpdate) => {
    this.setState({ currentSpeed: update.speed});
  }

  updateLinearUsage = (update: number) => {
    this.setState({ currentSpeedLinear: update });
  }

  componentDidMount() {
    this.context.cpuInfo().then(info => this.setState({ maxSpeed: info.maxSpeed || 0 }));
    this.speed.watch(this.updateUsage);
    this.speedLinear.watch(this.updateLinearUsage);
  }

  componentWillUnmount() {
    this.speed.remove(this.updateUsage);
    this.speedLinear.remove(this.updateLinearUsage);
  }

  render() {
    const numSegments = this.props.numSegments || 75;
    if (!this.state.currentSpeed || !this.state.currentSpeedLinear || !this.state.maxSpeed) {
      return null;
    }
    const graphPosition: AnnulusSegmentPosition = {
      ...this.props.position,
      startAngle: START_ANGLE,
      endAngle: END_ANGLE
    }
    const percentSpeed = this.state.currentSpeedLinear / this.state.maxSpeed;
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
        <SpeedLabel
          center={{x: graphPosition.cx, y: graphPosition.cy}}
          radius={(graphPosition.innerRadius + graphPosition.outerRadius) / 2}
          currentSpeed={this.state.currentSpeed}
          maxSpeed={this.state.maxSpeed}
        />
      </g>
    );
  }

}
