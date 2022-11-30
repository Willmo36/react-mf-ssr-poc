import { useQuery } from "@tanstack/react-query";
import { useFragmentInfo } from "fragments";
import React from "react";
import { PromotionListViewData } from "../domain/Promotion";
import { PromotionListView } from "./PromotionListView";

const promo1: PromotionListViewData = {
  title: "You're on a roll!",
  description: "Get a free meal when you order twice more by Sunday",
};
const promo2: PromotionListViewData = {
  title: "Freshii Fanatic",
  description: "Order 3 slots with Freshii, get 1 for free!",
};
const promos = [promo1, promo2, promo1, promo2];

export const SearchEnginePromotions: React.FC<{ query: string }> = (props) => {
  useFragmentInfo("SearchEnginePromotions", props);
  const promosQuery = useQuery({queryKey: ["promos", props.query], queryFn: () => Promise.resolve(promos)})
  return (
    <div className="">
      <h4 className="text-3xl font-bold ">Promotions</h4>
      <ul className="flex">
        {promosQuery.data?.map((promo) => (
          <PromotionListView {...promo} />
        ))}
      </ul>
    </div>
  );
};

export default SearchEnginePromotions;
