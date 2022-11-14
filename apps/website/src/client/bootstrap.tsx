import React from "react";
import {hydrateRoot} from "react-dom/client";
import { App } from "../components/App";

hydrateRoot(document.querySelector("#app")!, <App />);
