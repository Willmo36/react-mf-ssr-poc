import { Provider as JotaiProvider } from "jotai";
import React from "react";
import { SERP } from "../pages/SERP";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export const App = () => {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <JotaiProvider>
        <SERP />
      </JotaiProvider>
    </QueryClientProvider>
  );
};
