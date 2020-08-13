import * as React from "react";
import MemoryUsage from "./memoryUsage";

export default class MemoryUsageComponent extends React.Component<{}, {}> {

    mainElement: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<{}>) {
        super(props);
        this.mainElement = React.createRef();
    }

    componentDidMount() {
        if (this.mainElement.current) {
            const ui = new MemoryUsage(this.mainElement.current, 496, 200);
        }
    }

    render() {
        return (
            <div ref={this.mainElement} />
        )
    }
}
