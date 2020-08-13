import * as React from "react";
import CpuUIComponent from "../cpu";

export default class CpuProcessUIComponent extends React.Component<{}, {}>{
    render() {
        return (
            <div className={"cpuProcessContainer"}>
                <CpuUIComponent width={400} height={400} />
            </div>
        );
    }
}
