import * as ReactDOM from "react-dom";
import App from "./ui";
import * as React from "react";
import {IpcBackend} from "./ui/serverBackend";
import {Backend} from "./data/backend";

export default async function startRender() {
  const backend: Backend = new IpcBackend();
  window.config = await backend.getConfig();
  const rootElement = document.getElementById("root")
  if (rootElement) {
    ReactDOM.render(
      <App backend={backend}/>,
      rootElement
    )
  }
}
