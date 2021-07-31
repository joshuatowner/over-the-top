import IntervalObservable from "../../data/observable/intervalObservable";
import * as React from "react";

interface PropType<T> {
  observable: IntervalObservable<T>;
  getValue: (update: T) => string;
  x: number;
  y: number;
  x2: number;
  label: string;
}

interface StateType {
  value: string;
}

export default class ValueLabel<T> extends React.Component<PropType<T>, StateType> {
  constructor(props: Readonly<PropType<T>>) {
    super(props);
    this.state = {value: ""};
  }

  updateUsage = (update: T) => {
    this.setState({value: this.props.getValue(update)});
  }

  componentDidMount() {
    this.props.observable.watch(this.updateUsage);
  }

  componentWillUnmount() {
    this.props.observable.remove(this.updateUsage);
  }

  render() {
    return (<g>
      <text x={this.props.x} y={this.props.y} className={"value-label"}>{this.props.label}:</text>
      <text x={this.props.x2} y={this.props.y} className={"value-value"}>
        {this.state.value}
      </text>
    </g>);
  }
}
