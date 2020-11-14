import * as React from "react";
import NetworkUsage from "./networkUsage";

export default class NetworkUsageComponent extends React.Component<{}, {}> {

    mainElement: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<{}>) {
        super(props);
        this.mainElement = React.createRef();
    }

    componentDidMount() {
        if (this.mainElement.current) {
            const ui = new NetworkUsage(this.mainElement.current, 496, 201);
        }
    }

    render() {
        return (
            <div ref={this.mainElement} />
        )
    }
}
