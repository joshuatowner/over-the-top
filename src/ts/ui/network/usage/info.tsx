import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import PingBadge from "../ping/badge";
import RequestBadge from "../request/badge";
import AppliedObservable from "../../../data/observable/appliedObservable";
import {formatBinaryBytes, formatBytes} from "../../util/data";
import NetworkUsageBadge from "./badge";
import NetworkInterfaceSettingDropdown from "../../config/network/interface";
import {networkAdapter, networkUsage} from "../../observer/network";
import {Observable} from "../../../data/observable/observable";
import {BackendContext} from "../../backendContext";
import {Backend} from "../../../data/backend";

interface PropType {
  position: Vec2;
  size: Size;
}

interface StateType {
  name?: string;
}

const BADGE_WIDTH = 105;
const BADGE_PADDING = 6;


export default class NetworkInterfaceInfo extends React.Component<PropType, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  upObservable: Observable<string>;
  downObservable: Observable<string>;

  constructor(props: Readonly<PropType>, context: Backend) {
    super(props);
    this.state = {};
    this.upObservable = new AppliedObservable(networkUsage(context),
        networkUsage => `${formatBytes(networkUsage.up)}/s`);
    this.downObservable = new AppliedObservable(networkUsage(context),
        networkUsage => `${formatBytes(networkUsage.down)}/s`);
  }

  onUpdate = (networkAdapter: string) => {
    this.setState({
      name: networkAdapter
    });
  }

  componentDidMount() {
    networkAdapter(this.context).watch(this.onUpdate);
  }

  componentWillUnmount() {
    networkAdapter(this.context).remove(this.onUpdate);
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
        observable={this.downObservable} label={"DN"}
        position={{x: position.x + size.width - 3*(BADGE_WIDTH + BADGE_PADDING), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
      <NetworkUsageBadge
        observable={this.upObservable} label={"UP"}
        position={{x: position.x + size.width - 4*(BADGE_WIDTH + BADGE_PADDING), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
    </g>
  }

}
