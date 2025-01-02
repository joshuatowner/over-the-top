import * as React from "react";
import {ChangeEvent, ReactNode} from "react";
import {getAllInterfaces, getDefaultInterface} from "../../../backend/network";
import {BackendContext} from "../../backendContext";

interface PropType {
  showLabel?: boolean;
}

interface StateType {
  defaultInterface?: string;
  possibleInterfaces: string[];
}

export default class NetworkInterfaceSettingDropdown extends React.Component<PropType, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  constructor(props: Readonly<PropType>) {
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
          {this.state.defaultInterface}
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
      const config = window.config;
      config.network.interface = result;
      this.context.updateConfig(config)
        .catch((err: any) => console.error("Unable to save config!", err));
    }
  }

  render() {
    return <>
      {this.props.showLabel && <p>Network Interface: </p>}
      <select onChange={this.onChange}>
        {this.getOptions()}
      </select>
    </>
  }

}
