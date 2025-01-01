import * as React from "react";
import DotflowGraphV2 from "./graph";
import {Size} from "../../../../../util/vec2";
import {BackendContext} from "../../../../backendContext";
import IntervalObservable from "../../../../../data/observable/intervalObservable";
import {networkUsage} from "../../../../observer/network";
import LinearInterpolatedObservable from "../../../../../data/observable/linearInterpolatedObservable";
import AppliedObservable from "../../../../../data/observable/appliedObservable";
import {normalizePower} from "../../../../util/data";
import NetworkInterfaceInfo from "../../info";


const SIDE_SIZE = 40;

interface PropType {
  size: Size;
}

export default class NetworkUsageDotflowGraphV2 extends React.Component<PropType, {}> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  upUsage: IntervalObservable<number>;
  downUsage: IntervalObservable<number>;

  constructor(props: PropType, context: any) {
    super(props, context);
    const interval = networkUsage(this.context).interval / 3;
    this.upUsage = new LinearInterpolatedObservable(
      new AppliedObservable(networkUsage(this.context), update => normalizePower(update.up)), interval);
    this.downUsage = new LinearInterpolatedObservable(
      new AppliedObservable(networkUsage(this.context), update => normalizePower(update.down)), interval);
  }

  render() {
    const { width, height } = this.props.size;
    return <svg
      viewBox={`0 0 ${width} ${height}`}
    >
      <DotflowGraphV2
        observable={this.upUsage} maxValue={1} minValue={10} lanes={15}
        position={{x: 0, y: 0}}
        size={{width: width, height: height / 2 - 20}}/>
      <DotflowGraphV2
        observable={this.downUsage} maxValue={1} minValue={10} lanes={15}
        position={{x: 0, y: height / 2 + 20}}
        size={{width: width, height: height / 2 - 20}} reverse/>
      <NetworkInterfaceInfo
        position={{x: 0, y: height / 2 - 20}}
        size={{width: width, height: 40}}
      />
      <line
        className={"guide-primary"}
        x1={1} x2={1}
        y1={0}
        y2={height}
      />
      <line
        className={"guide-primary"}
        x1={width - 1} x2={width - 1}
        y1={0}
        y2={height}
      />
    </svg>;
  }

}
