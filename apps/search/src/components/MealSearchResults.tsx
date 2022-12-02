import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { memo } from "react";
import { hydrateQueryClient, simpleQueryKeyHash, useFragmentInfo } from "shared";
import { MealListViewData } from "../domain/Meal";
import { MealListView } from "./MealListView";

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

export const MealSearchResults: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("SearchEngineResults", props);
  const queryClient = useQueryClient();
  const queryKey = ["search", props.query];
  hydrateQueryClient(queryClient, queryKey);

  const mealsQuery = useQuery({
    queryKey,
    staleTime: 1000 * 30, 
    queryKeyHashFn: simpleQueryKeyHash,
    queryFn: () => Promise.resolve(meals_db),
  });

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

export default memo(MealSearchResults);;
