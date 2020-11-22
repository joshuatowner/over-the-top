import * as React from "react";
import DotBackground from "./dotBackground";
import CpuUsageWidget from "../cpu";
import {Size} from "../../util/vec2";
import "../../../scss/theme/default.scss";
import {CpuProcessesWidget, MemoryProcessesWidget} from "../process";
import MemoryUsageWidget, {SwapUsageWidget} from "../memory";
import {NetworkUsageWidget, PingWidget, WebRequestWidget} from "../network";
import {numPointsX, numPointsY} from "./points";
import ResponsiveLayoutEngine from "./engine/default";

interface LayoutState {
  windowSize: Size
}

export default class Layout extends React.Component<{}, LayoutState> {

  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    }
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  onResize = () => {
    this.setState({
      windowSize: {
        width: window.innerWidth,
        height: window.innerHeight
      }
    });
  }

  render() {
    return (<div id={"main"} className={"default-theme"}>
      <DotBackground windowSize={this.state.windowSize} />
      <ResponsiveLayoutEngine windowSize={this.state.windowSize} />
    </div>)
  }
}
