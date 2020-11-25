import * as React from "react";
import CpuHistoryGraphBackground from "./background";
import {AnnulusPosition} from "../../../../util/vec2";
import CpuHistoryGraphBars from "./bars";

interface PropType {
  position: AnnulusPosition
}

export default class CpuHistoryGraph extends React.Component<PropType, {}> {

  render() {
    return (
      <g>
        <CpuHistoryGraphBackground position={this.props.position}/>
        <CpuHistoryGraphBars position={this.props.position} numBars={100}/>
      </g>
    );
  }

}
