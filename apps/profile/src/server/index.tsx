import fs from "fs";
import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import { Profile } from "../components/Profile";
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
const webpackConfig = require('../../webpack.config.js');

const compiler = webpack(webpackConfig);
const app = express();
const port = process.env.PORT ?? "No port passed";

app.use('/js/',webpackDevMiddleware(compiler));

app.get("/", (req, res) => {
  const comp = <Profile name="Max Willmott" />;
  const html = renderToString(comp);
  res.send(html);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
