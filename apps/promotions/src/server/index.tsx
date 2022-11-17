import express from "express";
import React from "react";
import { delayHandler, renderMethod } from "shared";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import SearchEnginePromotions from "../components/SearchEnginePromotions";
const webpackConfig = require("../../webpack.config.js");

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT ?? "No port passed";

app.use("/js/", webpackDevMiddleware(compiler));

app.get("/fragments/search-promotions", delayHandler, (req, res) => {
  // @ts-ignore
  const query = req.query["query"] as string;

  const comp = <SearchEnginePromotions query={query} />;
  renderMethod(comp).pipe(res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
