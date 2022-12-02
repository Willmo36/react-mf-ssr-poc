import { FragmentRenderer, FragmentError } from "../../../../packages/shared/src";
import { useAtomValue } from "jotai";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loading } from "../components/Loading";
import { SearchTermAtom } from "../components/SearchBar";

export const SearchEngineResultsFragment = new FragmentRenderer<{
  query: string;
}>(
  "http://localhost:3001/fragments/search",
  //@ts-ignore
  () => import("search/SearchEngineResults"),
  <Loading text="Suspense streaming in Search HTML..." />,
  FragmentError
);

export const SearchEngineResultsPortal = () => {
  const term = useAtomValue(SearchTermAtom);
  return (
    <ErrorBoundary FallbackComponent={FragmentError}>
      {SearchEngineResultsFragment.render({ query: term })}
    </ErrorBoundary>
  );
};

