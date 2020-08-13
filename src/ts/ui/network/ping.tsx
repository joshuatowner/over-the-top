import * as React from "react";
import Two = require("two.js");
import {HexagonStatus} from "../common/hexagonStatus";
import {pingUpdate} from "../../backend/network";
import {getConfig} from "../../config";
import HexagonStatusText from "../common/hexagonStatusText";

const WIDTH = 100;
const HEIGHT = 100;

export default class PingComponent extends React.Component<{}, {}> {

    ref: React.RefObject<HTMLDivElement>;
    ui?: HexagonStatusText;

    constructor(props: Readonly<{}>) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        if (this.ref.current) {
            const config = getConfig().network;
            const two = new Two({
                width: WIDTH,
                height: HEIGHT,
            });
            this.ui = new HexagonStatusText(two, {x: WIDTH / 2, y: HEIGHT / 2}, WIDTH, HEIGHT, {
                period: config.timing.pingUpdateInterval,
                minOpacity: 0.2,
            });
            setInterval(() => this.update(), config.timing.pingUpdateInterval);
            two.appendTo(this.ref.current);
        }
    }

    async update() {
        const pingInfo = await pingUpdate();
        if (pingInfo.latency) {
            this.ui?.update(`${Math.round(pingInfo.latency)}`);
        }
    }

    render() {
        return <div ref={this.ref} />
    }


}
