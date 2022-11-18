import express from "express";
import React from "react";
import { delayHandler, fragmentHandler } from "server-shared";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import SearchEngineResults from "../components/SearchEngineResults";
const webpackConfig = require("../../webpack.config.js");

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.SEARCH_PORT ?? "No port passed";

app.use("/js/", webpackDevMiddleware(compiler));

app.get(
  "/fragments/search",
  delayHandler(Number(process.env.SEARCH_DELAY) ?? 0),
  fragmentHandler((req) => {
    // @ts-ignore
    const name = req.query["name"] as string;
    return <SearchEngineResults name={name} />;
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
