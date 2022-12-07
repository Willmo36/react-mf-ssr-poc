import { useAtomValue } from "jotai";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FragmentError, FragmentRenderer } from "shared";
import { Loading } from "../components/Loading";
import { SearchTermAtom } from "../components/SearchBar";

const loadingText = `Suspense streaming in Meals Search HTML with ${process.env.SEARCH_DELAY ?? 0}ms delay...`
export const MealSearchResultsFragment = new FragmentRenderer<{
  query: string;
}>(
  "http://localhost:3001/fragments/search",
  //@ts-ignore
  () => import("search/MealSearchResults"),
  <Loading text={loadingText}/>,
  FragmentError
);

export const MealSearchResultsPortal = () => {
  const query = useAtomValue(SearchTermAtom);
  return (
    <ErrorBoundary FallbackComponent={FragmentError}>
      {MealSearchResultsFragment.render({ query })}
    </ErrorBoundary>
  );
};

