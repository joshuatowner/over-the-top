import * as React from "react";

interface PropType {
  percentUsage: number;
}

export default class PartitionUsage extends React.Component<PropType, {}>{

  getStyle = () => ({
    height: `${this.props.percentUsage}%`
  })

  render() {
    return <div className={"partition-usage-bar-container background-secondary"}>
      <div className={"partition-usage-bar disk-primary-background"} style={this.getStyle()}/>
      <div className={"partition-usage-label"}>{this.props.percentUsage.toFixed(0)}%</div>
    </div>
  }

}
