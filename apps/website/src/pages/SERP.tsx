import React from "react";
import { SearchBar } from "../components/SearchBar";
import {
  SearchEnginePromotionsPortal
} from "../fragments/SearchEnginePromotionsFragment";
import { SearchEngineResultsPortal } from "../fragments/SearchEngineResultsFragment";

export const SERP = () => {
  console.info("SERP render");
  return (
    <div className="">
      <header className="header p-8 flex items-center justify-between bg-emerald-400">
        <div>
          <h1 className="text-4xl">ShareTheDishes</h1>
          <p className="text-sm italic">Kickstarter for meal prep</p>
        </div>
        <SearchBar />
        <h3>Sign in</h3>
      </header>

      <section className="p-10">
        <SearchEnginePromotionsPortal />
        <SearchEngineResultsPortal />
      </section>
    </div>
  );
};
