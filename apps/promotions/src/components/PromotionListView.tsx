import React from "react";
import { PromotionListViewData } from "../domain/Promotion";

export const PromotionListView: React.FC<PromotionListViewData> = ({
  title,
  description,
}) => {
  return (

      <div  className="flex flex-1 flex-col align-items p-5 m-5 border-solid border-2 border-amber-400 rounded drop-shadow-sm">
        <h4 className="text-xl">{title}</h4>
        <p className="text-sm">{description}</p>
      </div>
  );
};
