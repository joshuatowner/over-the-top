import React from "react";
import {Observable} from "../../../data/observable/observable";
import BadgeStatus from "../../common/BadgeStatus";
import {Size, Vec2} from "../../../util/vec2";

interface PropType {
  observable: Observable<string>;
  label: string;
  position: Vec2;
  size: Size;
}

interface StateType {
  value: string;
}

export default class NetworkUsageBadge extends React.Component<PropType, StateType> {

  constructor(props: Readonly<PropType>) {
    super(props);
    this.state = {
      value: ""
    };
  }

  onUpdate = (value: string) => {
    this.setState({
      value
    });
  }

  componentDidMount() {
    this.props.observable.watch(this.onUpdate);
  }

  componentWillUnmount() {
    this.props.observable.remove(this.onUpdate);
  }

  render() {
    const { position, size } = this.props;
    return <>
      <line
          x1={position.x}
          x2={position.x}
          y1={position.y} y2={position.y + size.height}
          className={"dotflow-guide-primary"}
      />
      <BadgeStatus
        className={"network-usage-badge"}
        value={this.state.value} error={false}
        {...this.props}
      />
    </>
  }

}
