import { Provider as JotaiProvider } from "jotai";
import React from "react";
import { SERP } from "../pages/SERP";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

export const App = () => {
  return (
    <QueryClientProvider client={new QueryClient({defaultOptions: {
      queries: {
        suspense: true
      }
    }})}>
      <ReactQueryDevtools />
      <JotaiProvider>
        <SERP />
      </JotaiProvider>
    </QueryClientProvider>
  );
};
