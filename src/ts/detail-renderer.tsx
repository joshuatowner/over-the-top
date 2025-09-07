import "../html/detail.html";
import ReactDOM from "react-dom/client";
import * as React from "react";
import { ProcessDetail } from "./ui/process/detail";

const rootElement = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
if (rootElement) {
  rootElement.render(
    <ProcessDetail />
  )
}
