import { FragmentRenderer } from "fragments";

export const SearchEnginePromotionsFragment = new FragmentRenderer<{query: string}>(
  "http://localhost:3002/fragments/search-promotions",
  //@ts-ignore
  () => import("promotions/SearchEnginePromotions"),
);
