import cors from "cors";
import express from "express";
import React from "react";
import { delayHandler, fragmentHandler, jsRouter } from "server-shared";
import PromotionSearchResults from "../components/PromotionSearchResults";
import { queryPromotions } from "./data";

// throw new Error("Damn the promo service is down")
const app = express();
const port = process.env.PROMOTIONS_PORT ?? "No port passed";

app.use(cors());
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

app.get("/query", async (req, res) => {
  const query = req.query["query"] as string;
  const promotions = await queryPromotions(query);
  res.json(promotions);
});

app.listen(port, () => {
  console.log(`Promotions app listening on port ${port}`);
});
