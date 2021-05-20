import * as React from "react";
import {AnnulusPosition} from "../../../../util/vec2";
import {cpuTemp} from "../../../../backend/cpu";
import {CpuTemperatureUpdate} from "../../../../data/cpu";


interface PropType {
  position: AnnulusPosition;
  numDots?: number;
}

interface StateType {
  currentIndex: number;
  temperatures: number[];
  shouldFade: boolean[];
}

export default class CpuTemperatureGraph extends React.Component<PropType, StateType> {

  numDots: number;

  constructor(props: Readonly<PropType>) {
    super(props);
    const initialTemps = [];
    const initialFades = [];
    this.numDots = this.props.numDots || 12;
    for (let i = 0; i < this.numDots; i++) {
      initialTemps.push(0);
      initialFades.push(true);
    }
    this.state = {
      currentIndex: 0,
      temperatures: initialTemps,
      shouldFade: initialFades
    };
  }

  updateUsage = (update: CpuTemperatureUpdate) => {
    const newTemps = [...this.state.temperatures];
    const newFades = [...this.state.shouldFade];
    newTemps[this.state.currentIndex] = update.temperature;
    newFades[Math.round(this.state.currentIndex + 0.5 * this.numDots) % this.numDots] = true;
    newFades[this.state.currentIndex] = false;
    this.setState({
      temperatures: newTemps,
      currentIndex: (this.state.currentIndex + 1) % this.numDots,
      shouldFade: newFades
    });
  }

  componentDidMount() {
    cpuTemp.watch(this.updateUsage);
  }

  componentWillUnmount() {
    cpuTemp.remove(this.updateUsage);
  }

  render() {
    return this.state.temperatures.map((temp, index) => {
      const radius = (this.props.position.innerRadius + this.props.position.outerRadius) / 2;
      const props = {
        cx: radius * Math.cos(Math.PI * 2 * (index / this.numDots)) + this.props.position.cx,
        cy: radius * Math.sin(Math.PI * 2 * (index / this.numDots)) + this.props.position.cy,
        r: 2, key: index,
        className: "cpu-temperature-dot" + (this.state.shouldFade[index] ? " fade-out" : "")
      }
      return (
        <circle {...props} />
      )
    })
  }

}
