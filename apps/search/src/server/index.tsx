import express from "express";
import React from "react";
import { delayHandler, fragmentHandler, jsRouter } from "server-shared";
import MealSearchResults from "../components/MealSearchResults";
import { queryMeals } from "./data";
import cors from "cors";

const app = express();
const port = process.env.SEARCH_PORT ?? "No port passed";

app.use(cors())
jsRouter(app);

app.get(
  "/fragments/search",
  delayHandler(Number(process.env.SEARCH_DELAY) ?? 0),
  fragmentHandler("search", (req) => {
    // @ts-ignore
    const query = req.query["query"] as string;
    return <MealSearchResults query={query} />;
  })
);

app.get("/query", async (req, res) => {
  const query = req.query["query"] as string;
  const meals = await queryMeals(query);
  res.json(meals);
});

app.listen(port, () => {
  console.log(`Search listening on port ${port}`);
});
