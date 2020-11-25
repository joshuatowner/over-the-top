import {Size, Vec2} from "../../../util/vec2";
import * as React from "react";
import {BarValue} from "../../util/bar";
import IntervalObservable from "../../../data/intervalObservable";
import LinearGraphBar from "./bar";

interface PropType<T> {
  topLeft: Vec2;
  size: Size;
  numBars: number;
  dashWidth: number;
  dashSpace: number;
  observable: IntervalObservable<T>;
  getValue: (update: T) => number;
  inverted?: boolean;
}

interface StateType {
  barValues: BarValue[];
}

export default class LinearGraphBars<T> extends React.Component<PropType<T>, StateType> {

  currentIndex: number;
  inverted = () => !!(this.props.inverted);

  constructor(props: Readonly<PropType<T>>) {
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

  updateUsage = (update: T) => {
    const newValues = [...this.state.barValues];
    const newValue: number = this.props.getValue(update);
    newValues[this.currentIndex] = {
      percent: newValue > 0 ? newValue : 0,
      fading: false
    };
    const beginFadeIndex = (Math.round(this.props.numBars * 0.25) + this.currentIndex) % this.props.numBars;
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
    this.props.observable.watch(this.updateUsage)
  }

  componentWillUnmount() {
    this.props.observable.remove(this.updateUsage);
  }

  render() {
    const {topLeft, dashWidth, dashSpace, size} = this.props;
    const bars = this.state.barValues.map((value, i) => <LinearGraphBar
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
      interval={this.props.observable.interval}
      inverted={this.inverted()}
    />);
    return <g>{bars}</g>;
  }

}
