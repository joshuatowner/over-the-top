import * as React from "react";
import {AnnulusPosition} from "../../../../util/vec2";
import CpuHistoryGraphBar from "./bar";
import {getEndAngle, getStartAngle} from "../../../util/angle";
import {cpuUsage} from "../../../../backend/cpu";
import {CpuUsageUpdate} from "../../../../data/cpu";
import {BarValue} from "../../../util/bar";

interface PropType {
  position: AnnulusPosition;
  numBars: number;
}

interface StateType {
  barValues: BarValue[];
}

export default class CpuHistoryGraphBars extends React.Component<PropType, StateType> {

  currentIndex: number;
  startAngles: number[];
  endAngles: number[];
  anglePadding = 0.005;

  constructor(props: Readonly<PropType>) {
    super(props);
    this.currentIndex = 0;
    const barValues = [];
    this.startAngles = [];
    this.endAngles = [];
    for (let i = 0; i < this.props.numBars; i++) {
      barValues.push({
        percent: 0,
        fading: true
      });
      this.startAngles.push(getStartAngle(i, this.props.numBars) + this.anglePadding)
      this.endAngles.push(getEndAngle(i, this.props.numBars) - this.anglePadding)
    }
    this.state = {barValues};
  }

  updateUsage = (update: CpuUsageUpdate) => {
    const newValues = [...this.state.barValues];
    newValues[this.currentIndex] = {
      percent: update.overallUsage,
      fading: false
    }
    const beginFadeIndex = (this.props.numBars * 0.25 + this.currentIndex) % this.props.numBars;
    newValues[beginFadeIndex] = {
      percent: newValues[beginFadeIndex].percent,
      fading: true
    };
    this.setState({
      barValues: newValues
    });
    this.currentIndex = (this.currentIndex + 1) % this.props.numBars;
  }

  componentDidMount() {
    cpuUsage.watch(this.updateUsage)
  }

  componentWillUnmount() {
    cpuUsage.remove(this.updateUsage);
  }

  render() {
    const padding = 3; // TODO constant
    return (
      <g>
        {
          this.state.barValues.map((barValue, index) => {
            const startAngle = this.startAngles[index];
            const endAngle = this.endAngles[index];
            return (
              <CpuHistoryGraphBar
                position={{
                  ...this.props.position,
                  innerRadius: this.props.position.innerRadius + padding,
                  outerRadius: this.props.position.outerRadius - padding,
                  startAngle, endAngle
                }}
                percent={barValue.percent}
                fading={barValue.fading}
                key={index}
              />
            )
          })
        }
      </g>
    );
  }
}
