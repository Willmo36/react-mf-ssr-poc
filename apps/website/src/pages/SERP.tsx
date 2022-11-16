import React from "react";
import { SearchEngineResultsFragment } from "../fragments/SearchEngineResults";

export const SERP = () => {
  return (
    <div className="container">
      <header className="header p-8 flex items-center justify-between">
        <h1 className="logo">iWantGrub</h1>
        <input
          placeholder="Search for Restaurants..."
          className="search_input w-1/2"
          type="text"
        />
        <h3>Sign in</h3>
      </header>

      <section>{SearchEngineResultsFragment.render({name: "Max Willmott"})}</section>
    </div>
  );
};
