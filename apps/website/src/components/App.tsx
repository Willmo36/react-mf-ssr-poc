import { Provider as JotaiProvider } from "jotai";
import React from "react";
import { SERP } from "../pages/SERP";

export const App = () => {
  return (
    <JotaiProvider>
      <SERP />
    </JotaiProvider>
  );
};
