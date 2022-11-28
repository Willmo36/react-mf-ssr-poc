import { FragmentError } from "fragments";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Loading } from "../components/Loading";
import { SearchEnginePromotionsFragment } from "../fragments/SearchEnginePromotionsFragment";
import { SearchEngineResultsFragment } from "../fragments/SearchEngineResultsFragment";

export const SERP = () => {
  return (
    <div className="">
      <header className="header p-8 flex items-center justify-between bg-emerald-400">
        <div>
          <h1 className="text-4xl">ShareTheDishes</h1>
          <p className="text-sm italic">Kickstarter for meal prep</p>
        </div>
        <form className="m-0 w-96">
          <div className="">
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="search"
              type="text"
              placeholder="Search for meals..."
            ></input>
          </div>
        </form>
        <h3>Sign in</h3>
      </header>

      <section className="p-10">
        <ErrorBoundary FallbackComponent={FragmentError}>
          {SearchEnginePromotionsFragment.render({ query: "Max Willmott" })}
        </ErrorBoundary>
        <ErrorBoundary FallbackComponent={FragmentError}>
          {SearchEngineResultsFragment.render({ name: "Max Willmott" })}
        </ErrorBoundary>
      </section>
    </div>
  );
};
