import React, { useEffect } from "react";
import { FragmentLoader } from "./FragmentLoader"

const PROFILE_URL = "http://localhost:3001";
export const App = () => {
  useEffect(() => {
    console.info("<App /> ready!");
  }, [])

	return (
      <FragmentLoader url={PROFILE_URL} />
	)
}