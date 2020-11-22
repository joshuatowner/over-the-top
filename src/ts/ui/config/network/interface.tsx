import * as React from "react";
import {getAllInterfaces, getDefaultInterface} from "../../../backend/network";
import {ChangeEvent, ReactNode} from "react";
import {getConfig, updateConfig} from "../../../config";

interface StateType {
  defaultInterface?: string;
  possibleInterfaces: string[];
}

export default class NetworkInterfaceSettingDropdown extends React.Component<{}, StateType> {

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      defaultInterface: undefined,
      possibleInterfaces: []
    };
  }

  componentDidMount() {
    getDefaultInterface().then(defaultInterface => this.setState({defaultInterface}));
    getAllInterfaces().then(possibleInterfaces => this.setState({possibleInterfaces}));
  }

  private getOptions(): ReactNode[] {
    const options: ReactNode[] = [];
    if (this.state.defaultInterface) {
      options.push(
        <option value={this.state.defaultInterface} key={-1}>
          default ({this.state.defaultInterface})
        </option>
      )
    }
    options.push(this.state.possibleInterfaces.map(
      (ifce, index) => <option value={ifce} key={index}>{ifce}</option>
    ));
    return options;
  }

  private onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const result = event?.target?.value;
    if (result) {
      const config = getConfig();
      config.network.interface = result;
      updateConfig(config)
        .catch((err) => console.error("Unable to save config!", err));
    }
  }

  render() {
    return <>
      <p>Network Interface: </p>
      <select onChange={this.onChange}>
        {this.getOptions()}
      </select>
    </>
  }

}
