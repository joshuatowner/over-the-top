// All of the Node.ts APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from "./ui";
import {loadConfig} from "./config";

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

  const rootElement = document.getElementById("root")
  if (rootElement) {
    ReactDOM.render(
      <App/>,
      rootElement
    )
  }
});
