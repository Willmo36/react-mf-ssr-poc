import express from "express";
import React from "react";
import { delayHandler, fragmentHandler, jsRouter } from "server-shared";
import SearchEngineResults from "../components/SearchEngineResults";

const app = express();
const port = process.env.SEARCH_PORT ?? "No port passed";

jsRouter(app);

app.get(
  "/fragments/search",
  delayHandler(Number(process.env.SEARCH_DELAY) ?? 0),
  fragmentHandler((req) => {
    // @ts-ignore
    const name = req.query["name"] as string;
    return <SearchEngineResults query={name} />;
  })
);

app.listen(port, () => {
  console.log(`Search listening on port ${port}`);
});
