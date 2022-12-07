import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dotenv from "dotenv";
import "cross-fetch";
import dotenvExpand from "dotenv-expand";
import type { Express, Handler, Request } from "express";
import express from "express";
import path from "path";
import React from "react";
import {
  renderToPipeableStream,
  renderToStaticNodeStream,
} from "react-dom/server";
import { ReactPipeableWithHydration } from "./ReactPipeableWithHydration";

const config = dotenv.config({ path: "../../.env.development" });
dotenvExpand.expand(config);

export const delayHandler =
  (ms: number): Handler =>
  (_rq, _rs, next) => {
    setTimeout(next, ms);
  };

export function fragmentHandler(
  fragmentId: string,
  render: (req: Request) => React.ReactElement
): Handler {
  return (req, res) => {
    const qc = new QueryClient({
      defaultOptions: {
        queries: {
          suspense: true,
        },
      },
    });
    const comp = render(req);
    const renderResult = (
      <QueryClientProvider client={qc}>{comp}</QueryClientProvider>
    );

    if (process.env.STATIC) {
      console.warn("Hydration not implemented for STATIC rendering demo");
      renderToStaticNodeStream(renderResult).pipe(res);
    } else {
      const pipeableStream = renderToPipeableStream(renderResult);
      const writableStream = new ReactPipeableWithHydration(res, qc);
      pipeableStream.pipe(writableStream);
      writableStream.once("finish", () => {
        res.end();
      });
    }
  };
}

export function jsRouter(app: Express) {
  if (process.env.NODE_ENV === "development") {
    const webpack = require("webpack");
    const webpackDevMiddleware = require("webpack-dev-middleware");
    const webpackConfig = require(path.join(
      process.cwd(),
      "./webpack.config.js"
    ));
    const compiler = webpack(webpackConfig);
    app.use("/js/", webpackDevMiddleware(compiler));
  } else {
    app.use("/js", express.static("dist"));
  }
}
