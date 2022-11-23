import path from "path";
import React from "react";
import type { Handler, Request, Express } from "express";
import {
  renderToPipeableStream,
  renderToStaticNodeStream,
} from "react-dom/server";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";

const config = dotenv.config({ path: "../../.env.development" });
console.info("The config", config);
dotenvExpand.expand(config);

export const delayHandler =
  (ms: number): Handler =>
  (_rq, _rs, next) => {
    setTimeout(next, ms);
  };

export const renderMethod =
  process.env.RENDER_TYPE === "stream"
    ? renderToPipeableStream
    : renderToStaticNodeStream;

export function fragmentHandler(
  render: (req: Request) => React.ReactElement
): Handler {
  return (req, res) => {
    renderMethod(render(req)).pipe(res);
  };
}

export function webpackDevServer(app: Express) {
  console.log("Applying webpack dev server", process.env.NODE_ENV, process.cwd())
  if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackConfig = require(path.join(
      process.cwd(),
      "./webpack.config.js"
    ));
    const compiler = webpack(webpackConfig);
    app.use("/js/", webpackDevMiddleware(compiler));
  }
}
