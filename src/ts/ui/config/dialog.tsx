import * as React from "react";

export default class SettingsDialog extends React.Component<{}, {}>{
  render() {
    return <div className={"widget-settings-dialog background-secondary"}>
      {this.props.children}
    </div>
  }
}
