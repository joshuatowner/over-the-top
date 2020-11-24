import * as React from "react";
import {MdSettings} from "react-icons/md";
import SettingsDialog from "./dialog";

interface StateType {
  showDialog: boolean;
}


export default class SettingsButton extends React.Component<{}, StateType>{

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      showDialog: false
    }
  }

  onButtonClick = () => this.setState({
    showDialog: !this.state.showDialog
  })

  render() {
    return (
      <div className={"widget-settings-button-container"}>
        <button onClick={this.onButtonClick} className={"widget-settings-button full"}>
          <MdSettings className={"full"}/>
        </button>
        {
          this.state.showDialog && <SettingsDialog>
            {this.props.children}
          </SettingsDialog>
        }
      </div>
    )
  }
}
