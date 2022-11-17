import express from "express";
import React from "react";
import { delayHandler, fragmentHandler } from "shared";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import SearchEnginePromotions from "../components/SearchEnginePromotions";
const webpackConfig = require("../../webpack.config.js");

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT ?? "No port passed";

app.use("/js/", webpackDevMiddleware(compiler));

app.get(
  "/fragments/search-promotions",
  delayHandler,
  fragmentHandler((req) => {
    // @ts-ignore
    const query = req.query["query"] as string;
    return <SearchEnginePromotions query={query} />;
  })
);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
