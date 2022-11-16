import fs from "fs";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import SearchEngineResults from "../components/SearchEngineResults";
const webpackConfig = require('../../webpack.config.js');

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT ?? "No port passed";

app.use('/js/',webpackDevMiddleware(compiler));

app.get("/fragments/search", (req, res) => {
  // @ts-ignore
  const name = req.query['name'] as string;
  const comp = <SearchEngineResults name={name} />
  const html = renderToString(comp);
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
