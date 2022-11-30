import React, { useEffect } from "react";
import { MealListViewData } from "../domain/Meal";
import { MealListView } from "./MealListView";
import { useFragmentInfo } from "fragments";
import { useQuery, hashQueryKey } from "@tanstack/react-query";

const meal: MealListViewData = {
  supplier: "McDonalds",
  mealTitle: "McMassive breakfast order",
  buyIn: 24,
  description: "1 week of McDonalds breakfast burgers",
  quotaMin: 10,
  quotaCurrent: 8,
  imgUrl: "foobar",
};
const meals_db: MealListViewData[] = new Array(5).fill(meal);

export const SearchEngineResults: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("SearchEngineResults", props);
  const queryKey = ["search", props.query];
  const mealsQuery = useQuery({
    queryKey,
    queryFn: (qk) => {
      console.info("executing RQ");
      return Promise.resolve(meals_db);
    },
  });
  useEffect(() => {
    const queryHash = `${queryKey.join("-")}`;
    // @ts-ignore
    const result = window[queryHash];
  }, []);

  return (
    <div className="inline">
      <h4 className="text-3xl font-bold ">Meals</h4>
      <ul>
        {mealsQuery.data?.map((meal) => (
          <MealListView {...meal} />
        ))}
      </ul>
    </div>
  );
};

export default SearchEngineResults;
