import * as React from "react";
import Layout from "./layout";
import "../../scss/main.scss";
import {Backend} from "../data/backend";
import {Config} from "../backend/config/interface";
import DEFAULT_CONFIG from "../backend/config/default";
import {BackendContext} from "./backendContext";

declare global {
  interface Window { config: Config; }
}

interface PropType {
  backend: Backend;
}

export default class App extends React.Component<PropType, {}> {
  render() {
    return (
      <BackendContext.Provider value={this.props.backend}>
        <Layout />
      </BackendContext.Provider>
    )
  }
}
