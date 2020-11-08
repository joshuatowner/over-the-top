import * as React from "react";
import DotBackground from "./dotBackground";
import CpuUsageWidget from "../cpu";
import {Size} from "../../util/vec2";
import "../../../scss/theme/default.scss";
import {CpuProcessesWidget, MemoryProcessesWidget} from "../process";

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
      <CpuUsageWidget
        initialTopLeft={{x: 0, y: 0}}
        initialBottomRight={{x: 8, y: 8}}
        windowSize={this.state.windowSize}
      />
      <CpuProcessesWidget
        initialTopLeft={{x: 9, y: 0}}
        initialBottomRight={{x: 14, y: 4}}
        windowSize={this.state.windowSize}
      />
      <MemoryProcessesWidget
        initialTopLeft={{x: 9, y: 4}}
        initialBottomRight={{x: 14, y: 8}}
        windowSize={this.state.windowSize}
      />
    </div>)
  }
}