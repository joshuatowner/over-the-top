import * as React from "react";
import {networkUsage} from "../../../../backend/network";
import DotflowGraph from "./graph";
import {normalizeLog} from "../../../util/data";
import LinearInterpolatedObservable from "../../../../data/observable/linearInterpolatedObservable";
import AppliedObservable from "../../../../data/observable/appliedObservable";
import NetworkInterfaceInfo from "../info";

const interval = networkUsage.interval / 2;
const upUsage = new LinearInterpolatedObservable(
  new AppliedObservable(networkUsage, update => normalizeLog(update.up)), interval);
const downUsage = new LinearInterpolatedObservable(
  new AppliedObservable(networkUsage, update => normalizeLog(update.down)), interval);

const VIEWBOX_WIDTH = 602;
const VIEWBOX_HEIGHT = 250;

const SIDE_SIZE = 80;

export default class NetworkUsageDotflowGraph extends React.Component<{}, {}> {

  render() {
    return <svg
      viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
    >
      <DotflowGraph
        observable={upUsage} maxValue={1} minValue={10} lanes={15}
        position={{x: SIDE_SIZE, y: 0}}
        size={{width: VIEWBOX_WIDTH - SIDE_SIZE * 2, height: VIEWBOX_HEIGHT / 2 - 20}}/>
      <DotflowGraph
        observable={downUsage} maxValue={1} minValue={10} lanes={15}
        position={{x: SIDE_SIZE, y: VIEWBOX_HEIGHT / 2 + 20}}
        size={{width: VIEWBOX_WIDTH - SIDE_SIZE * 2, height: VIEWBOX_HEIGHT / 2 - 20}} reverse/>
      <NetworkInterfaceInfo
        position={{x: SIDE_SIZE, y: VIEWBOX_HEIGHT / 2 - 20}}
        size={{width: VIEWBOX_WIDTH - SIDE_SIZE * 2, height: 40}}
      />
    </svg>;
  }

}
