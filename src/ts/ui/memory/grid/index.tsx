import React from "react";
import {Observable} from "../../../data/observable/observable";
import {Size, Vec2} from "../../../util/vec2";
import UsageGridItem from "./item";
import {shuffleArray} from "../../util/list";

interface PropType {
  observable: Observable<number>;
  position: Vec2;
  size: Size;
  gridSize: number;
  spacing?: number;
}

interface StateType {
  values: number[];
}


export default class UsageGrid extends React.Component<PropType, StateType> {

  rows: number;
  columns: number;
  spacing: number;
  offset: Vec2;
  accessors: number[];

  constructor(props: Readonly<PropType>) {
    super(props);
    this.spacing = this.props.spacing || 4;
    this.offset = { x: 0, y: 0 };
    const gridSizePadding = this.props.gridSize + this.spacing;
    this.rows = Math.floor(this.props.size.height / gridSizePadding);
    this.columns = Math.floor(this.props.size.width / gridSizePadding);
    this.offset = {
      x: (this.props.size.width - (this.columns * gridSizePadding - this.spacing)) / 2,
      y: (this.props.size.height - (this.rows * gridSizePadding - this.spacing)) / 2
    }
    this.accessors = shuffleArray(Array.from(Array(this.rows * this.columns).keys()))
    this.state = {
      values: new Array(this.rows * this.columns).fill(0)
    };
  }

  onUpdate = (value: number) => {
    const oneLength = Math.round(value * this.rows * this.columns);
    const newValues: number[] = new Array(oneLength).fill(1)
      .concat(Array(this.rows * this.columns - oneLength).fill(0));
    this.setState({
      values: newValues
    });
  }

  componentDidMount() {
    this.props.observable.watch(this.onUpdate);
  }

  componentWillUnmount() {
    this.props.observable.remove(this.onUpdate);
  }

  render() {
    const gridItems: JSX.Element[] = [];
    const {position, gridSize} = this.props;
    const gridSizePadding = gridSize + this.spacing;

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        gridItems.push(
          <UsageGridItem
            key={`${i}-${j}`}
            value={this.state.values[this.accessors[i * this.rows + j]]}
            position={{x: position.x + this.offset.x + gridSizePadding * i, y: position.y + this.offset.y + gridSizePadding * j}}
            size={{width: gridSize, height: gridSize}}
          />
        )
      }
    }
    return gridItems;
  }
}
