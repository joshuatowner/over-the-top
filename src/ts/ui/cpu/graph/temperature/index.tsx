import * as React from "react";
import {AnnulusPosition} from "../../../../util/vec2";
import {cpuTemp} from "../../../../backend/cpu";
import {CpuTemperatureUpdate} from "../../../../data/cpu";
import {getColorForPercentage, WHITE_RED_GRADIENT} from "../../../util/gradient";


interface PropType {
  position: AnnulusPosition;
  numDots?: number;
}

interface StateType {
  currentIndex: number;
  temperatures: number[];
  shouldFade: boolean[];
}

const MIN_TEMP_RED = 80;
const MAX_TEMP_RED = 100;

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

  updateUsage = (update: CpuTemperatureUpdate): void => {
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

  componentDidMount(): void {
    cpuTemp.watch(this.updateUsage);
  }

  componentWillUnmount(): void {
    cpuTemp.remove(this.updateUsage);
  }

  render() {
    return this.state.temperatures.map((temp, index) => {
      const radius = (this.props.position.innerRadius + this.props.position.outerRadius) / 2;
      let percentage = (temp - MIN_TEMP_RED) / (MAX_TEMP_RED - MIN_TEMP_RED);
      percentage = Math.min(Math.max(percentage, 0), 1);
      const props: React.SVGProps<SVGCircleElement> = {
        cx: radius * Math.cos(Math.PI * 2 * (index / this.numDots)) + this.props.position.cx,
        cy: radius * Math.sin(Math.PI * 2 * (index / this.numDots)) + this.props.position.cy,
        r: 2, key: index,
        className: "cpu-temperature-dot" + (this.state.shouldFade[index] ? " fade-out" : ""),
        fill: getColorForPercentage(percentage, WHITE_RED_GRADIENT)
      }
      return (
        <circle {...props} />
      )
    })
  }

}
