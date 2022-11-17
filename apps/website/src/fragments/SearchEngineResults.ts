import { FragmentRenderer } from "shared";

export const SearchEngineResultsFragment = new FragmentRenderer<{name: string}>(
  "http://localhost:3001/fragments/search",
  //@ts-ignore
  () => import("search/SearchEngineResults"),
);
