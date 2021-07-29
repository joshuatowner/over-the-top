import React from "react";
import {getDefaultInterface} from "../../../backend/network";
import {Size, Vec2} from "../../../util/vec2";
import PingBadge from "../ping/badge";

interface PropType {
  position: Vec2;
  size: Size;
}

interface StateType {
  name?: string;
}

export default class NetworkInterfaceInfo extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {};
    getDefaultInterface().then((name => this.setState({name})));
  }

  render() {
    const {position, size} = this.props;
    return <>
      <text
        className={"network-interface"} dominantBaseline={"central"}
        x={position.x + 10} y={position.y + size.height / 2}
      >
        {this.state.name}
      </text>
      <PingBadge position={{x: position.x + 50, y: position.y}} size={{width: 200, height: size.height}} />
    </>
  }

}
