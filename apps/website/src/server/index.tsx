import express from "express";
import React from "react";
import {
  renderToPipeableStream
} from "react-dom/server";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import { Html } from "../components/Html";
const webpackConfig = require("../../webpack.config.js");

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT ?? "No port passed";

app.use(express.static('public'));
app.use("/js/", webpackDevMiddleware(compiler));

app.get("/", (req, res) => {
  const comp = <Html />;
  const htmlStream = renderToPipeableStream(comp);
  htmlStream.pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
