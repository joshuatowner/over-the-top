import * as React from "react";
import {ReactNode} from "react";

interface PropsType {
  children: ReactNode;
}

export default class SettingsDialog extends React.Component<PropsType, {}> {
  render() {
    return <div className={"widget-settings-dialog background-secondary"}>
      {this.props.children}
    </div>
  }
}
