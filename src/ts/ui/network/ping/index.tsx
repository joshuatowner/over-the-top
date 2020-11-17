import * as React from "react";
import {getConfig} from "../../../config";
import HexagonBadge from "../../common/hexagonStatus";
import {ping} from "../../../backend/network";
import {PingUpdate} from "../../../data/network";
import Widget from "../../layout/widget";
import {Size} from "../../../util/vec2";
import NetworkUsageGraph from "../usage";


export default class PingHexagonBadge extends React.Component<{}, {}>{
    render() {
        return <HexagonBadge
          observable={ping}
          getValue={(update: PingUpdate) => update.latency?.toFixed(0) || ""}
          className={"network-primary-fill"}
        />
    }
}
