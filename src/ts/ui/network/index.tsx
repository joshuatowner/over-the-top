import * as React from "react";
import PingComponent from "./ping";
import RequestComponent from "./request";

export default class NetworkUIComponent extends React.Component<{}, {}> {

    render() {
        return <div className={"networkContainer"}>
            <div className={"sectionTitle"}>NETWORK</div>
            <div className={"sectionContainer"}>
            <div className={"connectivityContainer flex-horz"}>
                <PingComponent />
                <div className={"vbar-flex"}/>
                <RequestComponent />
            </div>
            </div>
        </div>;
    }
}
