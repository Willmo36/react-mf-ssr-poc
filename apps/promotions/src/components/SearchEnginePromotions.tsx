import React, { useCallback, useEffect } from "react";

export const SearchEnginePromotions: React.FC<{ query: string }> = (props) => {
  useEffect(() => {
    console.info("SearchEnginePromotions::init");
  });

  const onclick = useCallback(() => {
    console.info("SearchEngineResults::onclick");
  }, []);

  return (
    <div className="bg-lime-300">
      <h4 onClick={onclick} className="text-3xl font-bold underline">
        Promotions
      </h4>
    </div>
  );
};

export default SearchEnginePromotions;
