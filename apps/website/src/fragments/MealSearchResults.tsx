import { useAtomValue } from "jotai";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FragmentError, FragmentRenderer } from "shared";
import { Loading } from "../components/Loading";
import { SearchTermAtom } from "../components/SearchBar";

export const MealSearchResultsFragment = new FragmentRenderer<{
  query: string;
}>(
  "http://localhost:3001/fragments/search",
  //@ts-ignore
  () => import("search/MealSearchResults"),
  <Loading text="Suspense streaming in Search HTML..." />,
  FragmentError
);

export const MealSearchResultsPortal = () => {
  const query = useAtomValue(SearchTermAtom);
  console.info("Query changed", query)
  return (
    <ErrorBoundary FallbackComponent={FragmentError}>
      {MealSearchResultsFragment.render({ query })}
    </ErrorBoundary>
  );
};

