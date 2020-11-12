import * as React from "react";
import Widget from "../layout/widget";
import {Size} from "../../util/vec2";
import CpuUsageGraph from "./graph";
import MemoryUsageGraph from "./graph";

export default class MemoryUsageWidget extends Widget {
    renderContent(pixelSize: Size): React.ReactNode {
        return (
            <div className={"cpu-usage"}>
                <div className={"cpu-title widget-title"}>MEMORY USAGE</div>
                <MemoryUsageGraph />
            </div>
        );
    }

}
