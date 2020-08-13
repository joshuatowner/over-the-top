import {ProcessInfo} from "../../data/process";
import * as React from "react";
import ProcessItem from "./processItem";
import Color = require("color");


interface PropTypes {
    sortedProcesses: ProcessInfo[],
    title: string,
    displayValue?: (value: number) => string,
    percentOfTotalValue?: (value: number) => number,
    color: Color,
}


export default class ProcessBox extends React.Component<PropTypes, {}> {

    constructor(props: Readonly<PropTypes>) {
        super(props);
    }

    render() {
        return (
            <div className={"processBox"}>
                <div className={"processBoxTitleContainer"}>
                    <p className={"processBoxTitle"}>{this.props.title}</p>
                </div>
                <div className={"processesContainer"}>
                {this.props.sortedProcesses.map((proc) =>
                    <ProcessItem
                        name={proc.name}
                        value={this.getDisplayValue(proc.usage)}
                        key={proc.name}
                        color={this.props.color}
                        percentOfTotal={this.getPercentOfTotal(proc.usage)}
                    />
                )}
                </div>
            </div>
        )
    }

    private getDisplayValue(value: number): string {
        return this.props.displayValue ? this.props.displayValue(value) : value.toFixed(0);
    }

    private getPercentOfTotal(value: number): number {
        return this.props.percentOfTotalValue ? this.props.percentOfTotalValue(value) : 1;
    }
}
