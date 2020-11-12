import {Size, Vec2} from "../../../util/vec2";
import * as React from "react";
import {BarValue} from "../../util/bar";
import MemoryUsageGraphBar from "./bar";
import {CpuUsageUpdate} from "../../../data/cpu";
import {cpuUsage} from "../../../backend/cpu";
import {memoryUsage} from "../../../backend/memory";
import {MemoryUsageUpdate} from "../../../data/memory";

interface PropType {
  topLeft: Vec2;
  size: Size;
  numBars: number;
  dashWidth: number;
  dashSpace: number;
}

interface StateType {
  barValues: BarValue[];
}

export default class MemoryUsageGraphBars extends React.Component<PropType, StateType>{

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
    this.state = { barValues }
  }

  updateUsage = (update: MemoryUsageUpdate) => {
    const newValues = [...this.state.barValues];
    newValues[this.currentIndex] = {
      percent: update.memoryUsage,
      fading: false
    }
    const beginFadeIndex = (Math.round(this.props.numBars * 0.4) + this.currentIndex) % this.props.numBars;
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
    memoryUsage.watch(this.updateUsage)
  }

  componentWillUnmount() {
    memoryUsage.remove(this.updateUsage);
  }

  render() {
    const {topLeft, dashWidth, dashSpace, size} = this.props;
    const bars = this.state.barValues.map((value, i) => <MemoryUsageGraphBar
      topLeft={{
        x: topLeft.x + (dashSpace + dashWidth) * i,
        y: topLeft.y
      }}
      size={{
        width: dashWidth,
        height: size.height
      }}
      value={value}
      key={i}
    />);
    return <g>{bars}</g>;
  }

}
