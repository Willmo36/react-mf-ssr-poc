import React, { useCallback, useEffect } from "react";

export const SearchEngineResults: React.FC<{ name: string }> = (props) => {
  useEffect(() => {
    console.info("SearchEngineResults::init");
  });

  const onclick = useCallback(() => {
    console.info("SearchEngineResults::onclick");
  }, []);

  return (
    <section data-origin="search">
      <h4 onClick={onclick} className="text-3xl font-bold underline">
        {props.name}
      </h4>
    </section>
  );
};

export default SearchEngineResults;