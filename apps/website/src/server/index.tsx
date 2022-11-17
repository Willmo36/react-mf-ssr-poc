import express from "express";
import React from "react";
import { renderMethod } from "shared";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import { Html } from "../components/Html";
const webpackConfig = require("../../webpack.config.js");

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT ?? "No port passed";

app.use(express.static("public"));
app.use("/js/", webpackDevMiddleware(compiler));

app.get("/", (_req, res) => {
  const comp = <Html />;
  
  renderMethod(comp).pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
