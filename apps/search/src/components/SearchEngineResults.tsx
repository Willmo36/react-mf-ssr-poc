import React, { memo, useEffect } from "react";
import { MealListViewData } from "../domain/Meal";
import { MealListView } from "./MealListView";
import { useFragmentInfo } from "fragments";
import {
  useQuery,
  hashQueryKey,
  hydrate,
  useQueryClient,
  isServer,
  QueryKeyHashFunction,
} from "@tanstack/react-query";

const meal: MealListViewData = {
  supplier: "McDonalds",
  mealTitle: "McMassive breakfast order",
  buyIn: Math.random() * 50,
  description: "1 week of McDonalds breakfast burgers",
  quotaMin: 10,
  quotaCurrent: 8,
  imgUrl: "foobar",
};
const meal2: MealListViewData = {
  supplier: "A&W",
  mealTitle: "Fancy McBreakfast",
  buyIn: Math.random() * 50,
  description: "Like McDonalds but twice the price",
  quotaMin: 10,
  quotaCurrent: 8,
  imgUrl: "foobar",
};
const meals_db: MealListViewData[] = [meal, meal2];

const customQueryKeyHashFn: QueryKeyHashFunction<string[]> = (qk) =>
  `${qk.join("-")}`;
export const SearchEngineResults: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("SearchEngineResults", props);
  const queryClient = useQueryClient();
  const queryKey = ["search", props.query];
  const queryHash = customQueryKeyHashFn(queryKey);
  if (!isServer) {
    const result = (window as any)[queryHash];
    hydrate(queryClient, result);
  }

  const mealsQuery = useQuery({
    queryKey,
    staleTime: 1000 * 30, 
    queryKeyHashFn: customQueryKeyHashFn,
    queryFn: (qk) => {
      return Promise.resolve(meals_db);
    },
  });
  console.info("Query status", mealsQuery.status);
  return (
    <div className="inline">
      <h4 className="text-3xl font-bold ">Meals</h4>
      <ul>
        {mealsQuery.data?.map((meal) => (
          <MealListView key={meal.mealTitle} {...meal} />
        ))}
      </ul>
    </div>
  );
};

export default memo(SearchEngineResults);;
