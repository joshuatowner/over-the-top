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

  constructor(props: Readonly<PropType>) {
    super(props);
    this.currentIndex = 0;
    const barValues = [];
    for (let i = 0; i < this.props.numBars; i++) {
      barValues.push({
        percent: 0,
        fading: true
      });
    }
    this.state = {barValues}
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
    const anglePadding = 0.005;
    return (
      <g>
        {
          this.state.barValues.map((barValue, index) => {
            const startAngle = getStartAngle(index, this.props.numBars) + anglePadding;
            const endAngle = getEndAngle(index, this.props.numBars) - anglePadding;
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
