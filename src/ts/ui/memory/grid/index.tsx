import React from "react";
import {Observable} from "../../../data/observable/observable";
import {Size, Vec2} from "../../../util/vec2";
import UsageGridItem from "./item";

interface PropType {
  observable: Observable<number>;
  position: Vec2;
  size: Size;
  gridSize: number;
  spacing?: number;
}

interface StateType {
  value: number;
}


export default class UsageGrid extends React.Component<PropType, StateType> {

  rows: number;
  columns: number;
  spacing: number;
  offset: Vec2;

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      value: 0
    };
    this.spacing = this.props.spacing || 4;
    this.offset = { x: 0, y: 0 };
    const gridSizePadding = this.props.gridSize + this.spacing;
    this.rows = Math.floor(this.props.size.height / gridSizePadding);
    this.columns = Math.floor(this.props.size.width / gridSizePadding);
    this.offset = {
      x: (this.props.size.width - (this.columns * gridSizePadding - gridSizePadding)) / 2,
      y: (this.props.size.height - (this.rows * gridSizePadding - gridSizePadding)) / 2
    }
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
            value={1}
            position={{x: position.x + this.offset.x + gridSizePadding * i, y: position.y + this.offset.y + gridSizePadding * j}}
            size={{width: gridSize, height: gridSize}}
          />
        )
      }
    }
    return gridItems;
  }
}
