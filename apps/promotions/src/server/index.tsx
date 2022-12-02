import express from "express";
import React from "react";
import { delayHandler, fragmentHandler, jsRouter } from "server-shared";
import PromotionSearchResults from "../components/PromotionSearchResults";

// throw new Error("Damn the promo service is down")
const app = express();
const port = process.env.PROMOTIONS_PORT ?? "No port passed";

jsRouter(app);

app.get(
  "/fragments/search-promotions",
  delayHandler(Number(process.env.PROMOTIONS_DELAY) ?? 0),
  fragmentHandler("promotions", (req) => {
    // @ts-ignore
    const query = req.query["query"] as string;
    return <PromotionSearchResults query={query} />;
  })
);

app.listen(port, () => {
  console.log(`Promotions app listening on port ${port}`);
});
