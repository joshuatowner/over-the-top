import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./ui";
import {getConfig, loadConfig} from "./backend/config";
import NodeBackend from "./backend";

window.addEventListener("DOMContentLoaded", async () => {
  const replaceText = (selector: string, text: string) => {
    const element = document.getElementById(selector);
    if (element) {
      element.innerText = text;
    }
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, (process.versions as any)[type]);
  }

  await loadConfig();
  window.config = getConfig();

  const rootElement = document.getElementById("root")
  if (rootElement) {
    ReactDOM.render(
      <App backend={new NodeBackend()}/>,
      rootElement
    )
  }
});
