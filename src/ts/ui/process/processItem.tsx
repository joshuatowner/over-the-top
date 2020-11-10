import * as React from "react";
import {CSSProperties} from "react";

interface PropTypes {
  name: string,
  value: string,
  percentOfTotal: number,
  lastItem?: boolean,
}

export default class ProcessItem extends React.Component<PropTypes, {}> {

  getStyle(): CSSProperties {
    return {
      opacity: this.props.percentOfTotal
    }
  }

  render() {
    return (
      <div className={'process-item-container'}>
        <div className={'process-item-title-container'}>
          <p>{this.props.name}</p>
        </div>
        <div className={'process-item-value-container'}>
          <div className={'process-item-value-background full'} style={this.getStyle()} />
          <p>{this.props.value}</p>
        </div>
      </div>
    )
  }
}
