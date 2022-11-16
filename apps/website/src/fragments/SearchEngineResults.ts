import { FragmentRenderer } from "./FragmentRenderer";

export const SearchEngineResultsFragment = new FragmentRenderer<{name: string}>(
  "http://localhost:3001",
  //@ts-ignore
  () => import("profilemf/Profile"),
);
