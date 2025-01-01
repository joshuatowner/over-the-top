import React from "react";
import {Size, Vec2} from "../../../util/vec2";
import AppliedObservable from "../../../data/observable/appliedObservable";
import {formatBytes} from "../../util/data";
import NetworkUsageBadge from "./badge";
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

const BADGE_WIDTH = 140;
const BADGE_PADDING = 6;


export default class NetworkInterfaceInfo extends React.Component<PropType, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  upObservable: Observable<string>;
  downObservable: Observable<string>;

  constructor(props: Readonly<PropType>, context: Backend) {
    super(props, context);
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
        className={"network-dotflow-title"} dominantBaseline={"central"}
        x={position.x + 10} y={position.y + size.height / 2}
      >
        NETWORK <tspan className={"network-interface"}>{this.state.name}</tspan>
      </text>
      <NetworkUsageBadge
        observable={this.downObservable} label={"DN"} iconName={'keyboard_arrow_down'}
        position={{x: position.x + size.width - (BADGE_WIDTH), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
      <NetworkUsageBadge
        observable={this.upObservable} label={"UP"} iconName={'keyboard_arrow_up'}
        position={{x: position.x + size.width - 2*(BADGE_WIDTH), y: position.y + BADGE_PADDING}}
        size={{width: BADGE_WIDTH, height: size.height - 2*BADGE_PADDING}}
      />
    </g>
  }

}
