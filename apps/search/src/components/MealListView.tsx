import React, { useMemo } from "react";
import { MealListViewData } from "../domain/Meal";

export const MealListView: React.FC<MealListViewData> = ({
  supplier,
  mealTitle,
  description,
  quotaCurrent,
  quotaMin,
  buyIn
}) => {
  const remaining = useMemo(() => {
    if (quotaCurrent < quotaMin) {
      return `${quotaMin - quotaCurrent} slots remaining`;
    }

    return `Quota fulfilled, register soon!`;
  }, [quotaCurrent, quotaMin]);

  const hBookClick = () => {
    alert(`Hydrated click handler - You pay ${buyIn}`)
  }

  return (
    <div className="flex justify-between items-center p-5 m-5 border-solid border-2 border-emerald-400 rounded drop-shadow-sm">
      <div className="flex flex-col">
        <h4 className="text-xl">
          {supplier} - {mealTitle} - ${buyIn}
        </h4>
        <p className="text-md">{description}</p>
      </div>

      <div className="flex flex-col items-center">
        <button onClick={hBookClick} className="bg-emerald-400 hover:bg-emerald-300 text-white font-bold py-2 px-4 rounded-full">

          Book your meals
        </button>
        <p className="text-sm">{remaining}</p>
      </div>
    </div>
  );
};
