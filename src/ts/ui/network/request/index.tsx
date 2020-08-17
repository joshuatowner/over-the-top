import * as React from "react";
import {getConfig} from "../../../config";
import RequestHexComponent from "./requestHex";
import {getDomain} from "../../util/url";

export default class RequestComponent extends React.Component<{}, {}> {

    render() {
        return <>
            <div className={'flex-vert flex-center pingContainer'}>
                <div className={'conn-title'}>WEB</div>
                <div className={'conn-subtitle'}>{getDomain()}</div>
                <RequestHexComponent />
            </div>
        </>
    }



}
