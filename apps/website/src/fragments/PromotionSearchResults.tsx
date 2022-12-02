import { useAtomValue } from "jotai";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FragmentError, FragmentRenderer } from "shared";
import { Loading } from "../components/Loading";
import { SearchTermAtom } from "../components/SearchBar";

export const PromotionSearchResultsFragment = new FragmentRenderer<{
  query: string;
}>(
  "http://localhost:3002/fragments/search-promotions",
  //@ts-ignore
  () => import("promotions/PromotionSearchResults"),
  <Loading text="Suspense streaming in Promotions HTML..." />,
  FragmentError
);

export const PromotionSearchResultsPortal = () => {
  const term = useAtomValue(SearchTermAtom);
  return (
    <ErrorBoundary FallbackComponent={FragmentError}>
      {PromotionSearchResultsFragment.render({ query: term })}
    </ErrorBoundary>
  );
};
