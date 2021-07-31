import React from "react";
import {Observable} from "../../../data/observable/observable";
import {Size, Vec2} from "../../../util/vec2";

interface PropType {
  observable: Observable<number>;
  position: Vec2;
  size: Size;
}

interface StateType {
  value: number;
}



export default class UsageGrid extends React.Component<PropType, StateType> {

  rows: number;
  columns: number;

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      value: 0
    };
    this.rows = 0;
    this.columns = 0;
  }

  render() {
    return undefined;
  }
}
