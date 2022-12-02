import { Provider as JotaiProvider } from "jotai";
import React from "react";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "shared";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <SearchResultsPage />
      </JotaiProvider>
    </QueryClientProvider>
  );
};
