import {DetailGroup} from "./details";
import * as React from "react";
import DetailItem from "./item";

interface PropType {
  detailGroup: DetailGroup
}

export default class DetailGroupComponent extends React.Component<PropType, {}>{
  render() {
    return <>
      <div className={"detail-divider"} />
      <div className={"detail-group"}>
        <div className={"detail-title"}>{this.props.detailGroup.title}</div>
        <div className={"detail-items-container"}>
          {this.props.detailGroup.details.map((detail, index) =>
            (<DetailItem detail={detail} key={index} />))}
        </div>
      </div>
    </>
  }
}
