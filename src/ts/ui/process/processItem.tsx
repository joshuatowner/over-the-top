import * as React from "react";
import Color = require("color");

interface PropTypes {
    name: string,
    value: string,
    percentOfTotal: number,
    lastItem?: boolean,
    color: Color,
}

function getColor(color: Color, opacity: number) {
    return color.alpha(opacity).rgb().string();
}

export default class ProcessItem extends React.Component<PropTypes, {}> {
    render() {
        return (
            <div className={'processItemContainer'}>
                <div className={'processItemNameContainer'}>
                    <p>{this.props.name}</p>
                </div>
                <div className={'processItemValueContainer'}
                     style={{
                         backgroundColor: getColor(this.props.color, this.props.percentOfTotal)
                     }}>
                    <p>{this.props.value}</p>
                </div>
            </div>
        )
    }
}
