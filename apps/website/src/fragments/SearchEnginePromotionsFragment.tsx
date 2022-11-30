import { ErrorBoundary } from "react-error-boundary";
import { FragmentRenderer, FragmentError } from "fragments";
import React from "react";
import { Loading } from "../components/Loading";
import { useAtomValue } from "jotai";
import { SearchTermAtom } from "../components/SearchBar";

export const SearchEnginePromotionsFragment = new FragmentRenderer<{
  query: string;
}>(
  "http://localhost:3002/fragments/search-promotions",
  //@ts-ignore
  () => import("promotions/SearchEnginePromotions"),
  <Loading text="Suspense streaming in Promotions HTML..." />,
  FragmentError
);

export const SearchEnginePromotionsPortal = () => {
  const term = useAtomValue(SearchTermAtom);
  return (
    <ErrorBoundary FallbackComponent={FragmentError}>
      {SearchEnginePromotionsFragment.render({ query: term })}
    </ErrorBoundary>
  );
};
