import * as React from "react";
import Annulus from "../../../svg/annulus";
import {AnnulusPosition} from "../../../../util/vec2";

interface PropType {
  position: AnnulusPosition
}

export default class CpuHistoryGraphBackground extends React.Component<PropType, {}> {

  render() {
    return (
      <Annulus
        position={this.props.position}
        className={"cpu-history-background background-secondary-fill"}
      />
    );
  }

}