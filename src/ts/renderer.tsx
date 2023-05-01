import ReactDOM from "react-dom/client";
import App from "./ui";
import * as React from "react";
import {IpcBackend} from "./ui/serverBackend";
import {Backend} from "./data/backend";

export default async function startRender() {
  const backend: Backend = new IpcBackend();
  window.config = await backend.getConfig();
  const rootElement = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
  if (rootElement) {
    rootElement.render(
      <App backend={backend}/>
    )
  }
}
