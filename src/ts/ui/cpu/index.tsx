import * as React from "react";
import {CpuInfo} from "../../data/cpu";
import CpuUI from "./cpu";

interface PropTypes {
    width: number,
    height: number,
}

export default class CpuUIComponent extends React.Component<PropTypes, {}> {

    mainElement: React.RefObject<HTMLDivElement>;

    constructor(props: Readonly<PropTypes>) {
        super(props);
        this.mainElement = React.createRef();
    }

    componentDidMount() {
        if (this.mainElement.current) {
            const ui = new CpuUI(this.mainElement.current, this.props.width, this.props.height);
        }
    }

    render() {
        return (
            <div ref={this.mainElement} />
        )
    }
}
