import * as React from "react";
import Two = require("two.js");
import {pingUpdate, webUpdate} from "../../../backend/network";
import {getConfig} from "../../../config";
import HexagonStatusText from "../../common/hexagonStatusText";
import {setIntervalImmediate} from "../../../util/timing";

const WIDTH = 100;
const HEIGHT = 100;

export default class RequestHexComponent extends React.Component<{}, {}> {

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
                period: config.timing.webUpdateInterval,
                minOpacity: 0.2,
            });
            setIntervalImmediate(() => this.update(), config.timing.webUpdateInterval);
            two.appendTo(this.ref.current);
        }
    }

    async update() {
        const webInfo = await webUpdate();
        if (webInfo.latency) {
            this.ui?.update(`${Math.round(webInfo.latency)}`);
        }
    }

    render() {
        return <div ref={this.ref} />
    }


}
