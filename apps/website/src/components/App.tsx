import { Provider as JotaiProvider } from "jotai";
import React from "react";
import { SERP } from "../pages/SERP";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "shared";

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <SERP />
      </JotaiProvider>
    </QueryClientProvider>
  );
};
