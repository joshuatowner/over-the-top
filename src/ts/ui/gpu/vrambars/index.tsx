import {Observable} from "../../../data/observable/observable";
import {Size, Vec2} from "../../../util/vec2";
import {GpuVramBar} from "./bar";
import React from "react";
import {PingUpdate} from "../../../data/network";
import {ping} from "../../observer/network";
import {gpuUsage} from "../../observer/gpu";
import {GpuUsageUpdate} from "../../../data/gpu";
import {BackendContext} from "../../backendContext";

interface PropType {
  observable?: Observable<number>;
  position: Vec2;
  size: Size;
  barSize: number;
  barSpacing: number;
}

interface StateType {
  usage: number;
}

export class GpuVRamBars extends React.Component<PropType, StateType>{

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  constructor(props: PropType) {
    super(props);


  }

  onUpdate = (update: GpuUsageUpdate) => {
    this.setState({
      usage: update.vramUsageBytes / update.vramCapacityBytes,
    })
  }

  componentDidMount() {
    gpuUsage(this.context).watch(this.onUpdate);
  }

  componentWillUnmount() {
    gpuUsage(this.context).remove(this.onUpdate);
  }


  render() {

    const {size, position, barSize, barSpacing} = this.props;

    const numBars = Math.floor(size.width / barSpacing);

    const divisions = numBars + 1;
    const spacing = size.width / divisions;

    const bars = [];
    const usage = this.state?.usage || 0;
    let totalBarUsage = usage * numBars;

    for (let i = 0; i < numBars; i++) {
      const leftPadding = spacing * (i + 1);
      const barUsage = Math.min(Math.max(0, totalBarUsage), 1);
      totalBarUsage -= barUsage;
      bars.push(<GpuVramBar
        usage={barUsage}
        key={i}
        position={{x: position.x + leftPadding - (barSize / 2), y: position.y}}
        size={{width: barSize, height: size.height}}
      />);
    }

    return bars;
  }

}