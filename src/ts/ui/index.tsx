import * as React from "react";
import CpuUIComponent from "./cpu";
import MemoryUIComponent from "./memory";
import NetworkUIComponent from "./network";
import CpuProcessUIComponent from "./cpu_process_overview";
import ProcessesComponent from "./process";

export default class App extends React.Component<{}, {}> {
    render() {
        return (
            <div className={"main"}>
                <div className={"column1"}>
                    <CpuProcessUIComponent />
                </div>
                <div className={"column2"}>
                    <MemoryUIComponent />
                    <NetworkUIComponent />
                </div>
                <div className={"column3"}>
                </div>
            </div>
        )
    }
}
