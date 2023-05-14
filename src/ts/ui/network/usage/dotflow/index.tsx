import * as React from "react";
import DotflowGraph from "./graph";
import {normalizeLog} from "../../../util/data";
import LinearInterpolatedObservable from "../../../../data/observable/linearInterpolatedObservable";
import AppliedObservable from "../../../../data/observable/appliedObservable";
import NetworkInterfaceInfo from "../info";
import DotflowGraphSideLabel from "./sideLabel";
import {Size} from "../../../../util/vec2";
import {networkUsage} from "../../../observer/network";
import IntervalObservable from "../../../../data/observable/intervalObservable";
import {BackendContext} from "../../../backendContext";


const SIDE_SIZE = 40;

interface PropType {
  size: Size;
}

export default class NetworkUsageDotflowGraph extends React.Component<PropType, {}> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  upUsage: IntervalObservable<number>;
  downUsage: IntervalObservable<number>;

  constructor(props: PropType, context: any) {
    super(props, context);
    const interval = networkUsage(this.context).interval / 3;
    this.upUsage = new LinearInterpolatedObservable(
      new AppliedObservable(networkUsage(this.context), update => normalizeLog(update.up)), interval);
    this.downUsage = new LinearInterpolatedObservable(
      new AppliedObservable(networkUsage(this.context), update => normalizeLog(update.down)), interval);
  }

  render() {
    const { width, height } = this.props.size;
    return <svg
      viewBox={`0 0 ${width} ${height}`}
    >
      <DotflowGraph
        observable={this.upUsage} maxValue={1} minValue={10} lanes={15}
        position={{x: SIDE_SIZE, y: 0}}
        size={{width: width - SIDE_SIZE * 2, height: height / 2 - 20}}/>
      <DotflowGraph
        observable={this.downUsage} maxValue={1} minValue={10} lanes={15}
        position={{x: SIDE_SIZE, y: height / 2 + 20}}
        size={{width: width - SIDE_SIZE * 2, height: height / 2 - 20}} reverse/>
      <NetworkInterfaceInfo
        position={{x: SIDE_SIZE, y: height / 2 - 20}}
        size={{width: width - SIDE_SIZE * 2, height: 40}}
      />
      <DotflowGraphSideLabel
        centerRight={{x: SIDE_SIZE, y: height / 2}}
        label={"LOCAL"} height={height}
      />
      <DotflowGraphSideLabel
        centerRight={{x: width - SIDE_SIZE, y: height / 2}}
        label={"INTERNET"} reverse={true} height={height}
      />
    </svg>;
  }

}
