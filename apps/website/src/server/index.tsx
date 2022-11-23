import express from "express";
import React from "react";
import { fragmentHandler } from "server-shared";
import { Html } from "../components/Html";

const app = express();
const port = process.env.WEBSITE_PORT ?? "No port passed";

console.log("the env pleaze", process.env.NODE_ENV);
if (process.env.NODE_ENV === 'development') {
  const webpack = require("webpack");
  const webpackDevMiddleware = require("webpack-dev-middleware");
  const webpackConfig = require("../../webpack.config.js");
  const compiler = webpack(webpackConfig);
  app.use("/js/", webpackDevMiddleware(compiler));
}

app.use(express.static("public"));

app.get(
  "/",
  fragmentHandler(() => <Html />)
);

app.listen(port, () => {
  console.log(`Website on port ${port}`);
});
