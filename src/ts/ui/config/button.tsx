import * as React from "react";
import {MdSettings} from "react-icons/md";
import SettingsDialog from "./dialog";
import {ReactNode} from "react";

interface StateType {
  showDialog: boolean;
}

interface PropsType {
  children: ReactNode;
}


export default class SettingsButton extends React.Component<PropsType, StateType> {

  constructor(props: Readonly<PropsType>) {
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
