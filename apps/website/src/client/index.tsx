import React from "react";
import { render } from "react-dom";
import { App } from "../components/App";

document.addEventListener("DOMContentLoaded", () => {
  // timeout to visualize server html replacement
  setTimeout(() => {
    render(<App />, document.querySelector("#app"));
  }, 1000);
});
