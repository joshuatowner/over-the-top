import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import DiskRows from "../disk/diskRows";
import {DetailGroup, getDetails} from "./details";
import DetailGroupComponent from "./group";

interface StateType {
  detailGroups: DetailGroup[]
}

export class Details extends React.Component<{}, StateType> {

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      detailGroups: []
    }
  }

  async componentDidMount() {
    this.setState({
      detailGroups: await getDetails()
    })
  }

  render() {
    return <>
      {this.state.detailGroups.map((group, index) =>
      (<DetailGroupComponent detailGroup={group} key={index} />))}
      <div className={"detail-divider"} />
    </>
  }
}

export default class DetailsWidget extends Widget {

  renderContent(pixelSize: Size): React.ReactNode {
    return <div className={"widget-content"}>
      <div className={"details-title widget-title"}>DETAILS</div>
      <Details />
    </div>;
  }

}
