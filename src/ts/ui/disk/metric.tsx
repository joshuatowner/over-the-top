import * as React from "react";

interface PropType {
  label: string;
  metric: string;
}

export default class DiskMetric extends React.Component<PropType, {}>{
  render() {
    return (
      <>
        <div className={"partition-row-metric-title"}>{this.props.label}</div>
        <div className={"partition-row-metric-value"}>{this.props.metric}</div>
      </>
    );
  }
}
