import {
  QueryClientProvider,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import path from "path";
import React from "react";
import type { Handler, Request, Express } from "express";
import express from "express";
import {
  renderToPipeableStream,
  renderToStaticNodeStream,
} from "react-dom/server";
import dotenv from "dotenv";
import dotenvExpand from "dotenv-expand";
import { ReactPipeableWithHydration } from "./ReactPipeableWithHydration";

const config = dotenv.config({ path: "../../.env.development" });
dotenvExpand.expand(config);

export const delayHandler =
  (ms: number): Handler =>
  (_rq, _rs, next) => {
    setTimeout(next, ms);
  };

// export const renderMethod =
//   process.env.RENDER_TYPE === "stream"
//     ? renderToPipeableStream
//     : renderToStaticNodeStream;

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
      <QueryClientProvider client={qc}>
        {comp}
      </QueryClientProvider>
    );

    const pipeableStream = renderToPipeableStream(renderResult);
    const writableStream = new ReactPipeableWithHydration(res, qc);
    pipeableStream.pipe(writableStream);
    writableStream.once("finish", () => {
      res.end();
    });
  };
}

export function jsRouter(app: Express) {
  if (process.env.NODE_ENV === "development") {
    // if (false) {
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
