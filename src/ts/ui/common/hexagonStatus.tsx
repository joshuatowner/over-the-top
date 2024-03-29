import * as React from "react";
import {CSSProperties} from "react";
import Hexagon from "../svg/hexagon";
import IntervalObservable from "../../data/observable/intervalObservable";

const WIDTH = 100;
const HEIGHT = 100;

interface PropType<T> {
  observable: IntervalObservable<T>;
  getValue: (update: T) => string;
  isError?: (update: T) => boolean;
  className?: string;
}

interface StateType {
  value: string;
  fading: boolean;
  error: boolean;
}

export default class HexagonBadge<T> extends React.Component<PropType<T>, StateType> {

  fadeTimeout?: NodeJS.Timeout;

  constructor(props: Readonly<PropType<T>>) {
    super(props);
    this.state = {
      value: "",
      fading: false,
      error: false
    }
  }

  fadeLength = () => this.props.observable.interval * (1.5 / 1000);

  getStyle(): CSSProperties {
    return this.state.fading ? {
      animation: `fadeOut ${this.fadeLength()}s`
    } : {};
  }

  updateUsage = (update: T) => {
    this.setState({
      value: this.props.getValue(update),
      fading: false,
      error: !!this.props.isError && this.props.isError(update)
    });
    this.fadeTimeout = setTimeout(() => this.setState({
      fading: true
    }), this.props.observable.interval / 10);
  }

  componentDidMount() {
    this.props.observable.watch(this.updateUsage);
  }

  componentWillUnmount() {
    this.props.observable.remove(this.updateUsage);
    this.fadeTimeout && clearTimeout(this.fadeTimeout);
  }

  render() {
    return <svg width={WIDTH} height={HEIGHT}>
      <Hexagon
        center={{x: WIDTH / 2, y: HEIGHT / 2}}
        height={Math.min(WIDTH, HEIGHT)}
        style={this.getStyle()}
        className={this.state.error ? "network-hexagon-error" : this.props.className}
      />
      <Hexagon
        center={{x: WIDTH / 2, y: HEIGHT / 2}}
        height={Math.min(WIDTH, HEIGHT) * .7}
        className={"background-primary-fill"}
      />
      <text x={WIDTH / 2} y={HEIGHT / 2} className={"network-hexagon-label"}>
        {this.state.value}
      </text>
    </svg>
  }
}
