import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import {
  hydrateQueryClient,
  simpleQueryKeyHash,
  useFragmentInfo,
} from "shared";
import { queryMeals } from "../server/data";
import { MealListView } from "./MealListView";

export const MealSearchResults: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("SearchEngineResults", props);
  const queryClient = useQueryClient();
  const queryKey = ["search", props.query];
  hydrateQueryClient(queryClient, queryKey);

  const mealsQuery = useQuery({
    queryKey,
    staleTime: 1000 * 30,
    queryKeyHashFn: simpleQueryKeyHash,
    queryFn: (qk) => queryMeals(qk.queryKey[1] as any),
  });

  return (
    <div className="inline">
      <h4 className="text-3xl font-bold ">Meals</h4>
      <ul>
        {mealsQuery.data?.map((meal) => (
          <MealListView key={meal.mealTitle} {...meal} />
        ))}
      </ul>
      {mealsQuery.data?.length === 0 ? (
        <p className="mb-5">No meals found for "{props.query}"</p>
      ) : null}
    </div>
  );
};

export default MealSearchResults;
