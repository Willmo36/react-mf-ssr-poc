import express from "express";
import React from "react";
import { delayHandler, fragmentHandler, webpackDevServer } from "server-shared";
import SearchEnginePromotions from "../components/SearchEnginePromotions";

const app = express();
const port = process.env.PROMOTIONS_PORT ?? "No port passed";

webpackDevServer(app);

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
