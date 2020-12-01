import {Detail} from "./details";
import * as React from "react";

interface PropType {
  detail: Detail
}

export default class DetailItem extends React.Component<PropType, {}> {

  render() {
    return <>
      <div className={"detail-item-label"}>{this.props.detail.name}</div>
      <div className={"detail-item-value"}>{this.props.detail.value}</div>
    </>
  }

}
