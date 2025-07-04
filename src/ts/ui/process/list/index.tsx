import * as React from "react";
import {ProcessUsageInfo} from "../../../data/process";
import {ProcessListEntry} from "./entry";
import {BackendContext} from "../../backendContext";
import {processInfo} from "../../observer/process";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";
import {MdArrowDropDown} from "react-icons/md";


enum UsageAttribute {
  CPU,
  MEM
}

interface StateType {
  processes: ProcessUsageInfo[];
  sort: UsageAttribute;
  maxMem: number;
}

export class ProcessList extends React.Component<{}, StateType> {

  static contextType = BackendContext;
  context!: React.ContextType<typeof BackendContext>;

  constructor(props: {}, context: any) {
    super(props, context);
    this.state = {
      processes: [],
      sort: UsageAttribute.CPU,
      maxMem: 1,
    };
  }

  update = (info: ProcessUsageInfo[]) => {
    this.setState((state) => ({
      sort: state.sort,
      processes: this.sortEntries(info, state.sort),
    }));
  }

  componentDidMount() {
    this.context.memoryInfo().then((info) =>
      this.setState({ maxMem: info.memoryCapacity }));
    processInfo(this.context).watch(this.update)
  }

  componentWillUnmount() {
    processInfo(this.context).remove(this.update);
  }

  updateSort = (selected: UsageAttribute) => this.setState((state) => ({
    sort: selected,
    processes: this.sortEntries(state.processes, selected),
  }));

  sortEntries = (info: ProcessUsageInfo[], sort: UsageAttribute) => {
    if (sort == UsageAttribute.CPU) {
      return info.sort((info1, info2) => info2.cpu - info1.cpu);
    } else if (sort == UsageAttribute.MEM) {
      return info.sort((info1, info2) => info2.mem - info1.mem);
    } else {
      return [];
    }
  }

  render() {
    return <div className={"process-container"}>
      <div className={"process-entry process-legend"}>
        <div className={"process-name"}>PROCESS</div>
        <button className={"process-value"} onClick={() => this.updateSort(UsageAttribute.CPU)}>
          {this.state.sort === UsageAttribute.CPU && <DropDownArrow />} CPU
        </button>
        <button className={"process-value"} onClick={() => this.updateSort(UsageAttribute.MEM)}>
          {this.state.sort === UsageAttribute.MEM && <DropDownArrow />} MEM
        </button>
      </div>
      <OverlayScrollbarsComponent
        className={"process-list-container"}
        options={{
          scrollbars: {
            autoHide: 'leave',
            theme: 'os-theme-light',
          }
        }}
        defer
      >
        {this.state.processes.map(process =>
          <ProcessListEntry key={process.name} {...process} maxMem={this.state.maxMem} />
        )}
      </OverlayScrollbarsComponent>
    </div>;
  }

}

const DropDownArrow = () => <MdArrowDropDown viewBox={"4 4 18 18"} className={"process-legend-icon"} />