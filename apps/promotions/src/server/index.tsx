import express from "express";
import React from "react";
import { delayHandler, fragmentHandler } from "../../../../packages/server-shared/src";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import SearchEnginePromotions from "../components/SearchEnginePromotions";
const webpackConfig = require("../../webpack.config.js");

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PROMOTIONS_PORT ?? "No port passed";

app.use("/js/", webpackDevMiddleware(compiler));

app.get(
  "/fragments/search-promotions",
  delayHandler(Number(process.env.PROMOTIONS_DELAY) ?? 0),
  fragmentHandler((req) => {
    // @ts-ignore
    const query = req.query["query"] as string;
    return <SearchEnginePromotions query={query} />;
  })
);

app.listen(port, () => {
  console.log(`Promotions app listening on port ${port}`);
});
