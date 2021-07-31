import * as React from "react";
import {networkUsage} from "../../../../backend/network";
import DotflowGraph from "./graph";
import {normalizeLog} from "../../../util/data";
import LinearInterpolatedObservable from "../../../../data/observable/linearInterpolatedObservable";
import AppliedObservable from "../../../../data/observable/appliedObservable";
import NetworkInterfaceInfo from "../info";
import DotflowGraphSideLabel from "./sideLabel";
import {Size} from "../../../../util/vec2";

const interval = networkUsage.interval / 2;
const upUsage = new LinearInterpolatedObservable(
  new AppliedObservable(networkUsage, update => normalizeLog(update.up)), interval);
const downUsage = new LinearInterpolatedObservable(
  new AppliedObservable(networkUsage, update => normalizeLog(update.down)), interval);

const SIDE_SIZE = 40;

interface PropType {
  size: Size;
}

export default class NetworkUsageDotflowGraph extends React.Component<PropType, {}> {

  render() {
    const { width, height } = this.props.size;
    return <svg
      viewBox={`0 0 ${width} ${height}`}
    >
      <DotflowGraph
        observable={upUsage} maxValue={1} minValue={10} lanes={15}
        position={{x: SIDE_SIZE, y: 0}}
        size={{width: width - SIDE_SIZE * 2, height: height / 2 - 20}}/>
      <DotflowGraph
        observable={downUsage} maxValue={1} minValue={10} lanes={15}
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
