import * as React from "react";
import CpuUIComponent from "../cpu";
import ProcessesComponent from "../process";

export default class CpuProcessUIComponent extends React.Component<{}, {}>{
    render() {
        return (
            <div className={"cpuProcessContainer"}>
                <div className={"sectionTitle"}>
                    CPU & PROCESSES
                </div>
                <div className={"flex-horz sectionContainer sectionContainerMid"}>
                    <CpuUIComponent width={400} height={400} />
                    <ProcessesComponent />
                </div>
            </div>
        );
    }
}
