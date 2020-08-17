import * as React from "react";
import {getConfig} from "../../../config";
import PingHexComponent from "./pingHex";

export default class PingComponent extends React.Component<{}, {}> {

    render() {
        return <>
            <div className={'flex-vert flex-center pingContainer'}>
                <div className={'conn-title'}>PING</div>
                <div className={'conn-subtitle'}>{getConfig().network.pingIp}</div>
                <PingHexComponent />
            </div>
        </>
    }
}
