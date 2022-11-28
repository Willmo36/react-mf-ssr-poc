import { FragmentRenderer } from "fragments";
import React from "react";
import { Loading } from "../components/Loading";

export const SearchEngineResultsFragment = new FragmentRenderer<{name: string}>(
  "http://localhost:3001/fragments/search",
  //@ts-ignore
  () => import("search/SearchEngineResults"),
  <Loading text="Suspense streaming in Search HTML..."/>
);
