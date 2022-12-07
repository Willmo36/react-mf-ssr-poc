import { useAtomValue } from "jotai";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { FragmentError, FragmentRenderer } from "shared";
import { Loading } from "../components/Loading";
import { SearchTermAtom } from "../components/SearchBar";

const loadingText = `Suspense streaming in Promotions HTML with ${process.env.PROMOTIONS_DELAY ?? 0}ms delay...`
export const PromotionSearchResultsFragment = new FragmentRenderer<{
  query: string;
}>(
  "http://localhost:3002/fragments/search-promotions",
  //@ts-ignore
  () => import("promotions/PromotionSearchResults"),
  <Loading text={loadingText}/>,
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
