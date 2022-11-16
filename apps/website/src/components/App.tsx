import React, { useEffect } from "react";
import { SERP } from "../pages/SERP";
import { FragmentLoader } from "./FragmentLoader"

const PROFILE_URL = "http://localhost:3001";
export const App = () => {
  useEffect(() => {
    console.info("<App /> ready!");
  }, [])

	return (
    <SERP/>
      // <FragmentLoader url={PROFILE_URL} />
	)
}