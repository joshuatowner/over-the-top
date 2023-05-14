import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
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
    return <div className={"detail-groups"}>
      {this.state.detailGroups.map((group, index) =>
      (<DetailGroupComponent detailGroup={group} key={index} />))}
      <div className={"detail-divider"} />
    </div>
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
