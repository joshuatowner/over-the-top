import * as React from "react";
import {v4 as uuidv4} from 'uuid';
import DotflowGraphDotColumn from "./dotColumn";
import styled, {keyframes, StyledComponent} from "styled-components";
import DotflowGraphLegend from "./legend";
import DotflowGraphGuides from "./guides";
import {Size, Vec2} from "../../../../../util/vec2";
import IntervalObservable from "../../../../../data/observable/intervalObservable";

interface PropType {
  observable: IntervalObservable<number>;
  maxValue: number;
  minValue: number;
  position: Vec2;
  size: Size;
  reverse?: boolean;
  dotRadius?: number;
  lanes?: number;
  duration?: number;
}

interface StateType {
  ids: string[];
  values: number[];
}

export default class DotflowGraphV2 extends React.Component<PropType, StateType> {

  groupClass: StyledComponent<"g", any>;
  dotRadius: number;
  lanes: number;
  duration: number;

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      ids: [],
      values: []
    }
    this.dotRadius = this.props.dotRadius || 2;
    this.lanes = this.props.lanes || 40;
    this.duration = this.props.duration || this.getDuration(
      this.props.size,
      this.props.observable.interval,
      this.lanes,
      this.dotRadius
    );
    this.groupClass = this.getClass(
      this.props.size.width,
      this.dotRadius,
      this.duration,
      this.props.reverse || false
    );
  }

  updateUsage = (update: number) => {
    const max = this.props.size.width / (this.dotRadius * 3);
    if (this.state.ids.length > max) {
      this.state.ids.pop();
    }
    if (this.state.values.length > max) {
      this.state.values.pop();
    }
    this.state.ids.unshift(uuidv4());
    this.state.values.unshift(update);
    this.setState({
      ids: this.state.ids,
      values: this.state.values
    });
  }

  componentDidMount() {
    this.props.observable.watch(this.updateUsage)
  }

  componentWillUnmount() {
    this.props.observable.remove(this.updateUsage);
  }

  render() {
    const result = [];
    const { reverse, position, size } = this.props;
    for (let i = 0; i < this.state.ids.length; i++) {
      result.push(<DotflowGraphDotColumn
        key={this.state.ids[i]}
        value={this.state.values[i]}
        height={size.height - 10}
        position={{x: position.x + i * this.dotRadius * 3, y: position.y + (reverse ? 0 : 10)}}
        lanes={this.lanes}
        dotRadius={this.dotRadius}
        groupClass={this.groupClass}
      />);
    }
    return <g>
      <DotflowGraphGuides
        position={{x: position.x, y: position.y + (reverse ? 0 : 10)}}
        size={{width: size.width, height: size.height - 10}}
        lanes={this.lanes}
        lines={40}
        major={4}
        />
      <DotflowGraphLegend
        position={{x: position.x, y: position.y + (reverse ? size.height - 10 : 0)}}
        size={{width: size.width, height: 10}}
        lines={40}
        major={4}
        reverse={reverse || false}
      />
      <g>{result}</g>
      <line x1={position.x} x2={position.x + size.width}
            y1={position.y + (reverse ? 0 : size.height)} y2={position.y + (reverse ? 0 : size.height)}
            className={"dotflow-guide-primary"} />
      <rect
        x={position.x - this.dotRadius * 2.5} y={position.y + (reverse ? 0 : 10)}
        height={size.height - 10} width={this.dotRadius * 2.5 + 1} />
      <rect
        x={position.x + size.width - 1} y={position.y + (reverse ? 0 : 10
      )}
        height={size.height - 10} width={this.dotRadius * 2.5 + 1} />
    </g>;
  }

  getClass = (width: number, radius: number, duration: number, reverse: boolean) => {
    let start = -1 * radius;
    let end = width + radius;
    if (reverse) {
      const temp = end;
      end = start;
      start = temp;
    }
    const keyframe = keyframes`
      0% {
        transform: translateX(${start}px);
      }
      100% {
        transform: translateX(${end}px);
      }
    `;
    return styled.g`
    //animation: ${keyframe} ${duration}ms forwards linear;
  `
  }

  getDuration = (size: Size, updateInterval: number, lanes: number, radius: number) => {
    const { width, height } = size;
    const laneSpace = height / (lanes + 2);
    return updateInterval * (width + radius * 2) / laneSpace;
  }

}
