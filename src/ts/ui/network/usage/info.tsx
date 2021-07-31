import React from "react";
import {getDefaultInterface, networkUsage} from "../../../backend/network";
import {Size, Vec2} from "../../../util/vec2";
import PingBadge from "../ping/badge";
import RequestBadge from "../request/badge";
import AppliedObservable from "../../../data/observable/appliedObservable";
import {formatBinaryBytes, formatBytes} from "../../util/data";
import NetworkUsageBadge from "./badge";

interface PropType {
  position: Vec2;
  size: Size;
}

interface StateType {
  name?: string;
}

const BADGE_WIDTH = 105;
const BADGE_PADDING = 6;

const upObservable = new AppliedObservable(networkUsage, networkUsage => `${formatBytes(networkUsage.up)}/s`);
const downObservable = new AppliedObservable(networkUsage, networkUsage => `${formatBytes(networkUsage.down)}/s`);

export default class NetworkInterfaceInfo extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {};
    getDefaultInterface().then((name => this.setState({name})));
  }

  render() {
    const {position, size} = this.props;
    return <g>
      <text
        className={"network-interface"} dominantBaseline={"central"}
        x={position.x + 10} y={position.y + size.height / 2}
      >
        {this.state.name}
      </text>
      <RequestBadge
        position={{x: position.x + size.width - (BADGE_WIDTH + BADGE_PADDING), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
      <PingBadge
        position={{x: position.x + size.width - 2*(BADGE_WIDTH + BADGE_PADDING), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
      <NetworkUsageBadge
        observable={downObservable} label={"DN"}
        position={{x: position.x + size.width - 3*(BADGE_WIDTH + BADGE_PADDING), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
      <NetworkUsageBadge
        observable={upObservable} label={"UP"}
        position={{x: position.x + size.width - 4*(BADGE_WIDTH + BADGE_PADDING), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
    </g>
  }

}
