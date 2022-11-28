import React, { useMemo } from "react";
import { MealListViewData } from "../domain/Meal";

export const MealListView: React.FC<MealListViewData> = ({
  supplier,
  mealTitle,
  description,
  quotaCurrent,
  quotaMin,
}) => {
  const remaining = useMemo(() => {
    if (quotaCurrent < quotaMin) {
      return `${quotaMin - quotaCurrent} slots remaining`;
    }

    return `Quota fulfilled, register soon!`;
  }, [quotaCurrent, quotaMin]);

  return (
    <div className="flex justify-between items-center p-5 m-5 border-solid border-2 border-emerald-400 rounded drop-shadow-sm">

      <div className="flex flex-col">
        <h4 className="text-xl">
          {supplier} - {mealTitle}
        </h4>
        <p className="text-md">{description}</p>
      </div>

      <div>
        <p>{remaining}</p>
      </div>
    </div>
  );
};
