import React from "react";
import { MealListViewData } from "../domain/Meal";
import { MealListView } from "./MealListView";
import {useFragmentInfo} from "fragments";

const meal: MealListViewData = {
  supplier: "McDonalds",
  mealTitle: "McMassive breakfast order",
  buyIn: 24,
  description: "1 week of McDonalds breakfast burgers",
  quotaMin: 10,
  quotaCurrent: 8,
  imgUrl: "foobar"
}
const meals: MealListViewData[] = new Array(5).fill(meal);

export const SearchEngineResults: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("SearchEngineResults", props);

  return (
    <div className="inline">
      <h4 className="text-3xl font-bold ">
      Meals
      </h4>
      <ul>
        {meals.map(meal => <MealListView  {...meal} />)}
      </ul>
    </div>
  );
};

export default SearchEngineResults;
