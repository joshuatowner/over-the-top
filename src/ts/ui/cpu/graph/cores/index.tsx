import * as React from "react";
import {ReactNode} from "react";
import CpuCoreUsageGraphFrame from "./frame";
import CpuCoreUsageGraphBackground from "./background";
import CpuCoreUsageGraphBar from "./bar";
import {AnnulusPosition} from "../../../../util/vec2";
import {cpuInfo} from "../../../../backend/cpu";

interface PropType {
  position: AnnulusPosition
}

interface StateType {
  numCores?: number;
}

export default class CpuCoreUsageGraph extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      numCores: 0,
    }
    this.loadNumCores();
  }

  async loadNumCores() {
    const data = await cpuInfo();
    this.setState({
      numCores: data.cores
    });
  }

  getCoreGraphs(numCores: number): ReactNode {
    const nodes: ReactNode[] = [];
    for (let i = 0; i < numCores; i++) {
      nodes.push(<CpuCoreUsageGraphBar
        coreId={i}
        numCores={numCores}
        position={{
          ...this.props.position,
          innerRadius: this.props.position.innerRadius + 2,
          outerRadius: this.props.position.outerRadius - 2,
        }}
        key={i}
      />);
    }
    return (
      <g>{nodes}</g>
    );
  }

  render() {
    if (!this.state.numCores) {
      return null;
    }
    return (
      <>
        <CpuCoreUsageGraphBackground
          position={this.props.position}
          numCores={this.state.numCores}
        />
        {this.getCoreGraphs(this.state.numCores)}
        <CpuCoreUsageGraphFrame
          position={this.props.position}
          numCores={this.state.numCores}
        />
      </>
    )
  }
}
