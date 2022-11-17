import React, { useCallback, useEffect } from "react";

export const SearchEngineResults: React.FC<{ name: string }> = (props) => {
  useEffect(() => {
    console.info("SearchEngineResults::init");
  });

  const onclick = useCallback(() => {
    console.info("SearchEngineResults::onclick");
  }, []);

  return (
    <div className="bg-orange-300 p-4">
      <h4 onClick={onclick} className="text-3xl font-bold underline">
      Search Results:
      </h4>
    </div>
  );
};

export default SearchEngineResults;
