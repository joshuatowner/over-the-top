import * as React from "react";
import NetworkUsageComponent from "./networkUsage";
import PingComponent from "./ping";

export default class NetworkUIComponent extends React.Component<{}, {}> {

    render() {
        return <>
            <NetworkUsageComponent />
            <PingComponent />
        </>;
    }
}
