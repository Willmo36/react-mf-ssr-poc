import { MealListViewData } from "../domain/Meal";

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

export const queryMeals = async (
  query: string
): Promise<MealListViewData[]> => {
  console.log("on the server", query, process.env.SERVER);
  if (!!process.env.SERVER) {
    return Promise.resolve(
      meals_db.filter((meal) => {
        return meal.supplier.toLowerCase().startsWith(query);
      })
    );
  } else {
    const res = await fetch(`http://localhost:3001/query?query=${query}`);
    return res.json();
  }
};
