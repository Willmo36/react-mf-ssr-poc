import { FragmentRenderer, FragmentError } from "fragments";
import React from "react";
import { Loading } from "../components/Loading";

export const SearchEnginePromotionsFragment = new FragmentRenderer<{query: string}>(
  "http://localhost:3002/fragments/search-promotions",
  //@ts-ignore
  () => import("promotions/SearchEnginePromotions"),
  <Loading text="Suspense streaming in Promotions HTML..."/>,
  FragmentError
);
