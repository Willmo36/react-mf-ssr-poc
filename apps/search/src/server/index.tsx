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
  fragmentHandler("search", (req) => {
    // @ts-ignore
    const query = req.query["query"] as string;
    return <SearchEngineResults query={query} />;
  })
);

app.listen(port, () => {
  console.log(`Search listening on port ${port}`);
});
